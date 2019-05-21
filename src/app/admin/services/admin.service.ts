import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FirestoreService } from '../../services/firestore.service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

export interface CollectionData {
  name: string;
  collection: string;
  fileName: string;
  retrieved: boolean;
  loaded: boolean;
  data?: any;
}
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public collections$: BehaviorSubject<
    Array<CollectionData>
  > = new BehaviorSubject([]);

  /**
   * Define all the Collections in the Firestore
   */
  private collections: Array<CollectionData> = [
    {
      name: 'Ads',
      collection: 'ads',
      fileName: 'ads.json',
      retrieved: false,
      loaded: false
    },
    {
      name: 'Items',
      collection: 'items',
      fileName: 'items.json',
      retrieved: false,
      loaded: false
    },
    {
      name: 'Notes',
      collection: 'notes',
      fileName: 'notes.json',
      retrieved: false,
      loaded: false
    },
    {
      name: 'People',
      collection: 'people',
      fileName: 'people.json',
      retrieved: false,
      loaded: false
    },
    {
      name: 'Posts',
      collection: 'posts',
      fileName: 'posts.json',
      retrieved: false,
      loaded: false
    },
    {
      name: 'Users',
      collection: 'users',
      fileName: 'users.json',
      retrieved: false,
      loaded: false
    }
  ];

  constructor(
    private firestoreUtils: FirestoreService,
    private http: HttpClient
  ) {
    this.collections$.next(this.collections);
  }

  retrieve(col: CollectionData): Observable<any> {
    return this.firestoreUtils
      .col$(col.collection)
      .pipe(
        tap(docs => this.updateCollections(col.collection, docs, true, false))
      );
  }

  persist(col: CollectionData): Observable<any> {
    return forkJoin(
      col.data.map(doc => {
        return from(
          this.firestoreUtils.upsert(`${col.collection}/${doc.id}`, doc)
        );
      })
    );
  }

  /**
   * Iterate over all the collections and forkJoin a retrieve of each collection
   *
   * Tap into the retrieve of each collection and update the internal BehaviorSubject
   * with the documents from each collection.
   */
  retrieveAll(): Observable<any> {
    return forkJoin(
      this.collections.map(col => {
        return this.firestoreUtils
          .col$(col.collection)
          .pipe(
            tap(docs =>
              this.updateCollections(col.collection, docs, true, false)
            )
          );
      })
    );
  }

  /**
   * Iterate over all of the Collections then iterate over all of the Documents in
   * each Collection.
   *
   * Return an UPSERT Observalbe for each Document
   *
   * Function returns the forkJoin of all the nested observables.
   */
  persistAll(): Observable<any> {
    return forkJoin(
      this.collections.map(col => {
        if (col && col.data) {
          col.data.map(doc => {
            return from(
              this.firestoreUtils.upsert(`${col.collection}/${doc.id}`, doc)
            );
          });
        }
      })
    );
  }

  save(col: CollectionData) {
    // const blob = new Blob([JSON.stringify(col.data)], {
    //   type: 'application/json'
    // });
    // saveAs(blob, `${col.collection}_${moment(new Date()).format('YYYYMMDD')}`);
  }

  saveAll() {
    this.collections.map(col => {
      if (col.data) {
        this.save(col);
      }
    });
  }

  updateCollections(
    col: string,
    documents: Array<any>,
    retrieved: boolean,
    loaded: boolean
  ): boolean {
    const idx = this.collections.findIndex(c => c.collection === col);
    if (idx >= 0) {
      const newCollection = {
        ...this.collections[idx],
        data: documents,
        retrieved: retrieved,
        loaded: loaded
      };
      this.collections[idx] = newCollection;
      this.collections$.next([...this.collections]);
      return true;
    } else {
      return false;
    }
  }

  analyzeAll() {
    this.collections.forEach(col => this.analyze(col));
  }

  /**
   * The intention of this function is execute a series of validation rules
   * for any document collection that is created.
   *
   * To add a rule, add/modify a switch case, run the validation logic
   * and console.log the results.
   *
   * The rules should reference a Jira ticket number under the User Store AR-458
   * which should contain additional details about the rule and possibly mitigation
   * steps.
   *
   * @param col - the collection that the Analyze button was triggered on.
   */
  analyze(col: CollectionData) {
    const tick = new Date().getTime();
    let counter = 0;
    console.log(`%c${col.name} start`, 'color:green');
    switch (col.name) {
      case 'Patients': {
        // Rule #1 AR-459 Check if the Patient's ID contains the same
        // Location as its parent Organization.
        if (col.data) {
          col.data.forEach(p => {
            const vals = p.id.split(':');
            if (vals[0] !== p.organizations[0]) {
              console.log(
                `%cRule AR-459: Patient: ${p.id} is suspect`,
                'color:red'
              );
            }
            counter++;
          });
          if (counter === col.data.length) {
            console.log(
              `%cPatient Rule AR-459: Evaluated all ${counter} patients.`,
              'color:green'
            );
          } else {
            console.log(
              `%cPatient Rule AR-459: Evaluated ${counter} patients.`,
              'color:orange'
            );
          }
        }
      }
    }
    const tock = new Date().getTime() - tick;
    console.log(
      `%c${col.name} Complete in ${tock}ms`,
      counter > 0 ? 'color:red' : 'color:green'
    );
  }

  elasticInsert(col: CollectionData): Observable<any> {
    return forkJoin(
      col.data.map(doc => {
        let record = { ...doc };
        if (col.name.toLocaleLowerCase() === 'people') {
          record = {
            ...record,
            DOB: moment(doc.DOB.seconds * 1000).toString(),
            DOI: moment(doc.DOI.seconds * 1000).toString(),
            createdAt: moment(doc.createdAt.seconds * 1000).toString(),
            updatedAt: moment(doc.updatedAt.seconds * 1000).toString()
          };
        }
        console.log(record);
        return this.http
          .post(
            `http://localhost:9200/${col.name.toLocaleLowerCase()}/_doc/${
              record.id
            }`,
            record
          )
          .pipe(tap(() => console.log(`insert ${doc.id}`)));
      })
    );
  }

  elasticDelete(col: CollectionData) {
    console.log(`collection: `, col);
  }
}
