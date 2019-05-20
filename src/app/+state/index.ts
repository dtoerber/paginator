import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromReducer from './reducer';
import { environment } from '../../environments/environment';

export { AppFacade } from './facade';
export interface State {
  app: fromReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  app: fromReducer.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
