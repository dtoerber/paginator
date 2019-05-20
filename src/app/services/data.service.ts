import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, tap, first } from 'rxjs/operators';
import { FirestoreService } from '../services/firestore.service';
import { Person } from '../models';
import {
  AngularFirestore,
  QueryDocumentSnapshot,
  DocumentChangeAction
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  lastPersonRef: QueryDocumentSnapshot<Person>;

  constructor(
    private afs: AngularFirestore,
    private firestoreUtils: FirestoreService
  ) {}

  retrieveInitialPeople(pageSize: number): Observable<any> {
    return this.afs
      .collection(`people`, ref => ref.orderBy('lastName').limit(pageSize * 2))
      .snapshotChanges()
      .pipe(
        map((actions: DocumentChangeAction<Person>[]) => {
          this.lastPersonRef = actions[actions.length - 1].payload.doc;
          return actions.map((a: DocumentChangeAction<Person>) => {
            const data: object = a.payload.doc.data() as Person;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  retrievePeopleNextPage(pageSize: number): Observable<any> {
    return this.afs
      .collection(`people`, ref =>
        ref
          .orderBy('lastName')
          .limit(pageSize * 2)
          .startAfter(this.lastPersonRef)
      )
      .snapshotChanges()
      .pipe(
        tap((actions: DocumentChangeAction<Person>[]) => {
          if (actions.length) {
            this.lastPersonRef = actions[actions.length - 1].payload.doc;
          }
        }),
        map((actions: DocumentChangeAction<Person>[]) => {
          return actions.map((a: DocumentChangeAction<Person>) => {
            const data: object = a.payload.doc.data() as Person;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  retrievePatientsByLetter(letter: string): Observable<any> {
    if (letter !== 'Z') {
      const nextLetter = String.fromCharCode(letter.charCodeAt(0) + 1);
      return this.firestoreUtils.col$(`person`, ref =>
        ref
          .where('name', '>=', letter.toUpperCase())
          .where('name', '<=', nextLetter)
      );
    } else {
      return this.firestoreUtils.col$(`people`, ref =>
        ref.where('name', '>=', letter.toUpperCase())
      );
    }
  }

  retrievePatients(ids: Array<string>): Observable<any> {
    return forkJoin(
      ids.map(id => this.firestoreUtils.doc$(`people/${id}`).pipe(first()))
    );
  }
}
