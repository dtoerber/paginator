import * as actions from './admin.actions';

export interface State {
  collection: Array<any>;
  error: any;
}

export const initialState: State = {
  collection: [],
  error: null
};

export function reducer(
  state: State = initialState,
  action: actions.AdminActionsUnion
): State {
  switch (action.type) {
    case actions.ActionTypes.LoadCollectionSuccess:
    case actions.ActionTypes.RetrieveCollectionSuccess: {
      return {
        ...state,
        collection: { ...action.payload }
      };
    }

    case actions.ActionTypes.RetrieveCollectionError:
    case actions.ActionTypes.RetrieveAllCollectionsError:
    case actions.ActionTypes.PersistCollectionError:
    case actions.ActionTypes.PersistAllCollectionsError:
    case actions.ActionTypes.ElasticInsertError:
    case actions.ActionTypes.ElasticDeleteError:
    case actions.ActionTypes.Error: {
      return { ...state, error: action.payload };
    }

    case actions.ActionTypes.ClearState: {
      return { ...initialState };
    }

    default: {
      return state;
    }
  }
}
