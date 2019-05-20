import { Action } from '@ngrx/store';
import { Person } from '../../models';

export enum ActionTypes {
  Load = '[Paginator] Load',
  LoadSuccess = '[Paginator] Load Success',
  LoadError = '[Paginator] Load Error',

  NextPage = '[Paginator] Next Page',
  SetFilter = '[Paginator] Set Filter',

  Retrieve = '[Paginator] Retrieve',
  RetrieveSuccess = '[Paginator] Retrieve Success',
  RetrieveError = '[Paginator] Retrieve Error',

  Save = '[Paginator] Save',
  SaveSuccess = '[Paginator] Save Success',
  SaveError = '[Paginator] Save',

  SetCurrentPage = '[Paginator] Set Current Page',
  SetItemsPerPage = '[Paginator] Set Items Per Page',

  SetSelectedId = '[Paginator] Set Selected ID'
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
export class SetFilterAction implements Action {
  readonly type = ActionTypes.SetFilter;
  constructor(public payload: string) {}
}
export class RetrieveAction implements Action {
  readonly type = ActionTypes.Retrieve;
  constructor(public payload: Array<string>) {}
}
export class RetrieveSuccessAction implements Action {
  readonly type = ActionTypes.RetrieveSuccess;
  constructor(public payload: Array<Person>) {}
}
export class RetrieveErrorAction implements Action {
  readonly type = ActionTypes.RetrieveError;
  constructor(public payload: any) {}
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
export class SetSelectedIdAction implements Action {
  readonly type = ActionTypes.SetSelectedId;
  constructor(public payload: string) {}
}

export type Union =
  | LoadAction
  | LoadSuccessAction
  | LoadErrorAction
  | NextPageAction
  | SetFilterAction
  | RetrieveAction
  | RetrieveSuccessAction
  | RetrieveErrorAction
  | SaveAction
  | SaveSuccessAction
  | SaveErrorAction
  | SetCurrentPageAction
  | SetItemPerPageAction
  | SetSelectedIdAction;
