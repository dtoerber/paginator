import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as fromActions from './actions';
import { Person } from '../../models';

export function sortByLastName(a: Person, b: Person): number {
  return a.lastName.localeCompare(b.lastName);
}

export interface State extends EntityState<Person> {
  loading: boolean;
  currentPage: number;
  itemsPerPage: number;
  selectedId: string;
}

export const adapter: EntityAdapter<Person> = createEntityAdapter<Person>({
  sortComparer: sortByLastName
});

export const initialState: any = adapter.getInitialState({
  loading: false,
  currentPage: 0,
  itemsPerPage: 5,
  selectedId: ''
});

export function reducer(
  state = initialState,
  action: fromActions.Union
): State {
  switch (action.type) {
    case fromActions.ActionTypes.LoadSuccess:
      return adapter.upsertMany(action.payload, state);
    case fromActions.ActionTypes.SetCurrentPage:
      return { ...state, currentPage: action.payload };
    case fromActions.ActionTypes.SetItemsPerPage:
      return { ...state, itemsPerPage: action.payload };
    case fromActions.ActionTypes.SetLoading:
      return { ...state, loading: action.payload };
    case fromActions.ActionTypes.SetSelectedId:
      return { ...state, selectedId: action.payload };
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

export const getLoading = (state: State) => state.loading;
export const getCurrentPage = (state: State) => state.currentPage;
export const getItemsPerPage = (state: State) => state.itemsPerPage;
export const getSelectedId = (state: State) => state.selectedId;
