import { Action } from '@ngrx/store';
import { Person } from '../../models';

export enum ActionTypes {
  Load = '[Paginator] Load',
  LoadSuccess = '[Paginator] Load Success',
  LoadError = '[Paginator] Load Error',

  Save = '[Paginator] Save',
  SaveSuccess = '[Paginator] Save Success',
  SaveError = '[Paginator] Save'
}

export class LoadAction implements Action {
  readonly type = ActionTypes.Load;
}
export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LoadSuccess;
  constructor(public payload: Array<Person>) {}
}
export class LoadErrorAction implements Action {
  readonly type = ActionTypes.LoadError;
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

export type Union =
  | LoadAction
  | LoadSuccessAction
  | LoadErrorAction
  | SaveAction
  | SaveSuccessAction
  | SaveErrorAction;
