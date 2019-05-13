import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromActions from './actions';
import * as fromReducer from './reducer';
import * as fromSelectors from './selectors';

@Injectable({ providedIn: 'root' })
export class PageFacade {
  items$: Observable<Array<Document>> = this.store.pipe(
    select(fromSelectors.selectAllItems)
  );

  constructor(private store: Store<fromReducer.State>) {}

  load() {
    this.store.dispatch(new fromActions.LoadAction());
  }
}
