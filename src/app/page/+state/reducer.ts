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
  filter: string;
}

export const adapter: EntityAdapter<Person> = createEntityAdapter<Person>({
  sortComparer: sortByLastName
});

export const initialState: any = adapter.getInitialState({
  loading: false,
  currentPage: 1,
  itemsPerPage: 5,
  selectedId: '',
  filter: ''
});

export function reducer(
  state = initialState,
  action: fromActions.Union
): State {
  switch (action.type) {
    case fromActions.ActionTypes.LoadSuccess:
    case fromActions.ActionTypes.RetrieveSuccess:
      return adapter.upsertMany(action.payload, state);
    case fromActions.ActionTypes.SetCurrentPage:
      return { ...state, currentPage: action.payload };
    case fromActions.ActionTypes.SetItemsPerPage:
      return { ...state, itemsPerPage: action.payload };
    case fromActions.ActionTypes.SetLoading:
      return { ...state, loading: action.payload };
    case fromActions.ActionTypes.SetSelectedId:
      return { ...state, selectedId: action.payload };
    case fromActions.ActionTypes.SetFilter:
      return { ...state, filter: action.payload };
    case fromActions.ActionTypes.LoadError:
    case fromActions.ActionTypes.RetrieveError:
      return { ...state, error: action.payload };
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
export const getFilter = (state: State) => state.filter;
