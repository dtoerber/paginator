import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './admin.reducer';

export const selectAdminState = createFeatureSelector<fromReducer.State>(
  'admin'
);
export const selectCollection = createSelector(
  selectAdminState,
  state => state.collection
);
