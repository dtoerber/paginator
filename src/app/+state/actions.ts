import { Action } from '@ngrx/store';

export enum ActionTypes {
  SetLoading = '[Paginator] Set Loading'
}

export class SetLoadingAction implements Action {
  readonly type = ActionTypes.SetLoading;
  constructor(public payload: boolean) {}
}

export type Union = SetLoadingAction;
