import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromReducer from './reducer';

export const selectPageState = createFeatureSelector<fromReducer.State>('app');

export const selectLoading = createSelector(
  selectPageState,
  fromReducer.getLoading
);
