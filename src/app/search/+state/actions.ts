import { Action } from '@ngrx/store';
import { Person } from '../../models';

export enum ActionTypes {
  Search = '[Search] Search',
  SearchSuccess = '[Search] Search Success',
  SearchError = '[Search] Search Error'
}

export class SearchAction implements Action {
  readonly type = ActionTypes.Search;
  constructor(public payload: string) {}
}
export class SearchSuccessAction implements Action {
  readonly type = ActionTypes.SearchSuccess;
  constructor(public payload: Array<Person>) {}
}
export class SearchErrorAction implements Action {
  readonly type = ActionTypes.SearchError;
  constructor(public payload: any) {}
}

export type Union = SearchAction | SearchSuccessAction | SearchErrorAction;
