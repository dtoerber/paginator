import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromReducer from './reducer';

export const selectPageState = createFeatureSelector<fromReducer.State>('page');

export const selectAllItems = createSelector(
  selectPageState,
  fromReducer.selectAll
);

export const selectTotal = createSelector(
  selectPageState,
  fromReducer.selectTotal
);

export const selectIds = createSelector(
  selectPageState,
  fromReducer.selectIds
);

export const selectCurrentPage = createSelector(
  selectPageState,
  fromReducer.getCurrentPage
);

export const selectItemsPerPage = createSelector(
  selectPageState,
  fromReducer.getItemsPerPage
);

export const selectSelectedId = createSelector(
  selectPageState,
  fromReducer.getSelectedId
);

export const selectFilter = createSelector(
  selectPageState,
  fromReducer.getFilter
);
