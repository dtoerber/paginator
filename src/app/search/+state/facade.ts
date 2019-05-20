import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromActions from './actions';
import * as fromReducer from './reducer';
import * as fromSelectors from './selectors';
import { Person } from '../../models';

@Injectable({ providedIn: 'root' })
export class SearchFacade {
  results$: Observable<Array<Person>> = this.store.pipe(
    select(fromSelectors.selectAllResults)
  );

  constructor(private store: Store<fromReducer.State>) {}

  search(search: string) {
    this.store.dispatch(new fromActions.SearchAction(search));
  }
}
