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

  constructor(private store: Store<fromReducer.State>) {}

  load() {
    this.store.dispatch(new fromActions.LoadAction());
  }

  save(person: Person) {
    this.store.dispatch(new fromActions.SaveAction(person));
  }
}
