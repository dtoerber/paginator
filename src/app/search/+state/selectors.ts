import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromReducer from './reducer';

export const selectSearchState = createFeatureSelector<fromReducer.State>(
  'search'
);

export const selectAllResults = createSelector(
  selectSearchState,
  fromReducer.selectAll
);

export const selectTotal = createSelector(
  selectSearchState,
  fromReducer.selectTotal
);
