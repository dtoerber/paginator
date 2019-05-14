import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromActions from './actions';
import * as fromReducer from './reducer';
import * as fromSelectors from './selectors';
import { Person } from '../../models';
@Injectable({ providedIn: 'root' })
export class PageFacade {
  people$: Observable<Array<Person>> = this.store.pipe(
    select(fromSelectors.selectAllItems)
  );

  loading$: Observable<boolean> = this.store.pipe(
    select(fromSelectors.selectLoading)
  );

  currentPage$: Observable<number> = this.store.pipe(
    select(fromSelectors.selectCurrentPage)
  );

  itemsPerPage$: Observable<number> = this.store.pipe(
    select(fromSelectors.selectItemsPerPage)
  );

  total$: Observable<number> = this.store.pipe(
    select(fromSelectors.selectTotal)
  );

  selectedId$: Observable<string> = this.store.pipe(
    select(fromSelectors.selectSelectedId)
  );

  constructor(private store: Store<fromReducer.State>) {}

  load(pageSize: number) {
    this.store.dispatch(new fromActions.LoadAction(pageSize));
  }

  loadNextPage(pageSize: number) {
    this.store.dispatch(new fromActions.NextPageAction(pageSize));
  }

  setLoading(loading: boolean) {
    this.store.dispatch(new fromActions.SetLoadingAction(loading));
  }

  save(person: Person) {
    this.store.dispatch(new fromActions.SaveAction(person));
  }

  setCurrentPage(page: number) {
    this.store.dispatch(new fromActions.SetCurrentPageAction(page));
  }

  setItemsPerPage(items: number) {
    this.store.dispatch(new fromActions.SetItemPerPageAction(items));
  }

  setSelectedId(id: string) {
    this.store.dispatch(new fromActions.SetSelectedIdAction(id));
  }
}
