import * as fromActions from './actions';

export interface State {
  loading: boolean;
}

export const initialState: State = {
  loading: false
};

export function reducer(
  state = initialState,
  action: fromActions.Union
): State {
  switch (action.type) {
    case fromActions.ActionTypes.SetLoading:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export const getLoading = (state: State) => state.loading;
