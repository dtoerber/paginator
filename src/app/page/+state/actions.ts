import { Action } from '@ngrx/store';

export enum ActionTypes {
  Load = '[Paginator] Load',
  LoadSuccess = '[Paginator] Load Success',
  LoadError = '[Paginator] Load Error'
}

export class LoadAction implements Action {
  readonly type = ActionTypes.Load;
}
export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LoadSuccess;
  constructor(public payload: Array<any>) {}
}
export class LoadErrorAction implements Action {
  readonly type = ActionTypes.LoadError;
  constructor(public payload: any) {}
}

export type Union = LoadAction | LoadSuccessAction | LoadErrorAction;
