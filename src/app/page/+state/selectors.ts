import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromReducer from './reducer';

export const selectPageState = createFeatureSelector<fromReducer.State>('page');

export const selectAllItems = createSelector(
  selectPageState,
  fromReducer.selectAll
);
