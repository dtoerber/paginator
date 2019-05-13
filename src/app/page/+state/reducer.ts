import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as fromActions from './actions';
import { Person } from '../../models';
export interface State extends EntityState<Person> {}

export const adapter: EntityAdapter<Person> = createEntityAdapter<Person>();

export const initialState: any = adapter.getInitialState();

export function reducer(
  state = initialState,
  action: fromActions.Union
): State {
  switch (action.type) {
    case fromActions.ActionTypes.LoadSuccess:
      return adapter.addMany(action.payload, state);
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
