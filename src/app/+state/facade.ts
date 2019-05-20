import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromActions from './actions';
import * as fromReducer from './reducer';
import * as fromSelectors from './selectors';

@Injectable({ providedIn: 'root' })
export class AppFacade {
  loading$: Observable<boolean> = this.store.pipe(
    select(fromSelectors.selectLoading)
  );

  constructor(private store: Store<fromReducer.State>) {}

  setLoading(loading: boolean) {
    this.store.dispatch(new fromActions.SetLoadingAction(loading));
  }
}
