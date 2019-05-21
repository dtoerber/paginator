import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromReducer from './admin.reducer';
import * as fromActions from './admin.actions';
import * as fromSelectors from './admin.selectors';
import { CollectionData } from '../services/admin.service';
import {} from '../../models';

@Injectable({ providedIn: 'root' })
export class AdminFacade {
  constructor(private store: Store<fromReducer.State>) {}
  retrieve(col: CollectionData) {
    this.store.dispatch(new fromActions.RetrieveCollectionAction(col));
  }
  loadCollection(file: File) {
    this.store.dispatch(new fromActions.LoadCollectionAction(file));
  }

  retrieveAll(data: any) {
    this.store.dispatch(new fromActions.RetrieveAllCollectionsAction(data));
  }

  save(collection: CollectionData) {
    this.store.dispatch(new fromActions.SaveCollectionAction(collection));
  }

  saveAll(data: any) {
    this.store.dispatch(new fromActions.SaveAllCollectionsAction(data));
  }

  persist(collection: CollectionData) {
    this.store.dispatch(new fromActions.PersistCollectionAction(collection));
  }

  persistAll(data: any) {
    this.store.dispatch(new fromActions.PersistAllCollectionsAction(data));
  }

  analyze(data: CollectionData) {
    this.store.dispatch(new fromActions.AnalyzeAction(data));
  }

  analyzeAll() {
    this.store.dispatch(new fromActions.AnalyzeAllAction());
  }

  elasticInsert(data: any) {
    this.store.dispatch(new fromActions.ElasticInsertAction(data));
  }

  elasticDelete(data: any) {
    this.store.dispatch(new fromActions.ElasticDeleteAction(data));
  }

  elasticBulk(data: any) {
    this.store.dispatch(new fromActions.ElasticBulkAction(data));
  }
}
