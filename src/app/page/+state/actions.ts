import { Action } from '@ngrx/store';
import { Person } from '../../models';

export enum ActionTypes {
  Load = '[Paginator] Load',
  LoadSuccess = '[Paginator] Load Success',
  LoadError = '[Paginator] Load Error',

  SetLoading = '[Paginator] Set Loading',

  NextPage = '[Paginator] Next Page',

  Save = '[Paginator] Save',
  SaveSuccess = '[Paginator] Save Success',
  SaveError = '[Paginator] Save',

  SetCurrentPage = '[Paginator] Set Current Page',
  SetItemsPerPage = '[Paginator] Set Items Per Page'
}

export class LoadAction implements Action {
  readonly type = ActionTypes.Load;
  constructor(public payload: number) {}
}
export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LoadSuccess;
  constructor(public payload: Array<Person>) {}
}
export class LoadErrorAction implements Action {
  readonly type = ActionTypes.LoadError;
  constructor(public payload: any) {}
}

export class NextPageAction implements Action {
  readonly type = ActionTypes.NextPage;
  constructor(public payload: number) {}
}
export class SetLoadingAction implements Action {
  readonly type = ActionTypes.SetLoading;
  constructor(public payload: boolean) {}
}
export class SaveAction implements Action {
  readonly type = ActionTypes.Save;
  constructor(public payload: Person) {}
}
export class SaveSuccessAction implements Action {
  readonly type = ActionTypes.SaveSuccess;
}
export class SaveErrorAction implements Action {
  readonly type = ActionTypes.SaveError;
  constructor(public payload: any) {}
}
export class SetCurrentPageAction implements Action {
  readonly type = ActionTypes.SetCurrentPage;
  constructor(public payload: number) {}
}
export class SetItemPerPageAction implements Action {
  readonly type = ActionTypes.SetItemsPerPage;
  constructor(public payload: number) {}
}

export type Union =
  | LoadAction
  | LoadSuccessAction
  | LoadErrorAction
  | SetLoadingAction
  | NextPageAction
  | SaveAction
  | SaveSuccessAction
  | SaveErrorAction
  | SetCurrentPageAction
  | SetItemPerPageAction;
