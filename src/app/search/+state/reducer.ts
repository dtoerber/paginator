import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Person } from '../../models';
import * as fromActions from './actions';

export interface State extends EntityState<Person> {}

export const adapter: EntityAdapter<Person> = createEntityAdapter<Person>({});

export const initialState: any = adapter.getInitialState({});

export function reducer(
  state = initialState,
  action: fromActions.Union
): State {
  switch (action.type) {
    case fromActions.ActionTypes.SearchSuccess:
      return adapter.addAll(action.payload, state);
    default:
      return state;
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
