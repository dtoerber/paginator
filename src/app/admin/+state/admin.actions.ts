import { Action } from '@ngrx/store';
import { CollectionData } from '../services/admin.service';

export enum ActionTypes {
  RetrieveCollection = '[Admin] Retrieve Collection',
  RetrieveCollectionSuccess = '[Admin] Retrieve Collection Success',
  RetrieveCollectionError = '[Admin] Retrieve Collection Error',

  PersistCollection = '[Admin] Persist Collection',
  PersistCollectionSuccess = '[Admin] Persist Collection Success',
  PersistCollectionError = '[Admin] Persist Collection Error',

  RetrieveAllCollections = '[Admin] Retrieve All Collections',
  RetrieveAllCollectionsConfirmed = '[Admin] Retrieve All Collections Confirmed',
  RetrieveAllCollectionsCancelled = '[Admin] Retrieve All Collections Cancelled',
  RetrieveAllCollectionsSuccess = '[Admin] Retrieve All Collections Success',
  RetrieveAllCollectionsError = '[Admin] Retrieve All Collections Error',

  SaveAllCollections = '[Admin] Save All Collections',
  SaveAllCollectionsConfirmed = '[Admin] Save All Collections Confirmed',
  SaveAllCollectionsCancelled = '[Admin] Save All Collections Cancelled',
  SaveAllCollectionsSuccess = '[Admin] Save All Collections Success',
  SaveAllCollectionsError = '[Admin] Save All Collections Error',

  PersistAllCollections = '[Admin] Persist All Collections',
  PersistAllCollectionsConfirmed = '[Admin] Persist All Collections Confirmed',
  PersistAllCollectionsCancelled = '[Admin] Persist All Collections Cancelled',
  PersistAllCollectionsSuccess = '[Admin] Persist All Collections Success',
  PersistAllCollectionsError = '[Admin] Persist All Collections Error',

  LoadCollection = '[Admin] Load Collection',
  LoadCollectionSuccess = '[Admin] Load Collection Success',

  SaveCollection = '[Admin] Save Collection',
  SaveCollectionSuccess = '[Admin] Save Collection Success',
  SaveCollectionError = '[Admin] Save Collection Error',

  Analyze = '[Admin] Analyze Collection',
  AnalyzeAll = '[Admin] Analyze All Collections',

  ElasticInsert = '[Admin] ElasticSearch Insert',
  ElasticInsertSuccess = '[Admin] ElasticSearch Insert Success',
  ElasticInsertError = '[Admin] ElasticSearch Insert Error',

  ElasticBulk = '[Admin] ElasticSearch Bulk',
  ElasticBulkSuccess = '[Admin] ElasticSearch Bulk Success',
  ElasticBulkError = '[Admin] ElasticSearch Bulk Error',

  ElasticDelete = '[Admin] ElasticSearch Delete',
  ElasticDeleteSuccess = '[Admin] ElasticSearch Delete Success',
  ElasticDeleteError = '[Admin] ElasticSearch Insert Delete Error',

  Success = '[Admin] Success',
  Error = '[Admin] Error',

  ClearState = '[Admin] Clear State'
}

export class RetrieveCollectionAction implements Action {
  readonly type = ActionTypes.RetrieveCollection;
  constructor(public payload: any) {}
}
export class RetrieveCollectionSuccessAction implements Action {
  readonly type = ActionTypes.RetrieveCollectionSuccess;
  constructor(public payload: any) {}
}
export class RetrieveCollectionErrorAction implements Action {
  readonly type = ActionTypes.RetrieveCollectionError;
  constructor(public payload: any) {}
}
export class RetrieveAllCollectionsAction implements Action {
  readonly type = ActionTypes.RetrieveAllCollections;
  constructor(public payload: any) {}
}
export class RetrieveAllCollectionsConfiremedAction implements Action {
  readonly type = ActionTypes.RetrieveAllCollectionsConfirmed;
}
export class RetrieveAllCollectionsCancelledAction implements Action {
  readonly type = ActionTypes.RetrieveAllCollectionsCancelled;
}

export class RetrieveAllCollectionsSuccessAction implements Action {
  readonly type = ActionTypes.RetrieveAllCollectionsSuccess;
}
export class RetrieveAllCollectionsErrorAction implements Action {
  readonly type = ActionTypes.RetrieveAllCollectionsError;
  constructor(public payload: any) {}
}

export class SaveAllCollectionsAction implements Action {
  readonly type = ActionTypes.SaveAllCollections;
  constructor(public payload: any) {}
}
export class SaveAllCollectionsConfiremedAction implements Action {
  readonly type = ActionTypes.SaveAllCollectionsConfirmed;
}
export class SaveAllCollectionsCancelledAction implements Action {
  readonly type = ActionTypes.SaveAllCollectionsCancelled;
}

export class SaveAllCollectionsSuccessAction implements Action {
  readonly type = ActionTypes.SaveAllCollectionsSuccess;
}
export class SaveAllCollectionsErrorAction implements Action {
  readonly type = ActionTypes.SaveAllCollectionsError;
  constructor(public payload: any) {}
}

export class PersistAllCollectionsAction implements Action {
  readonly type = ActionTypes.PersistAllCollections;
  constructor(public payload: any) {}
}
export class PersistAllCollectionsConfirmedAction implements Action {
  readonly type = ActionTypes.PersistAllCollectionsConfirmed;
}
export class PersistAllCollectionsCancelledAction implements Action {
  readonly type = ActionTypes.PersistAllCollectionsCancelled;
}

export class PersistAllCollectionsSuccessAction implements Action {
  readonly type = ActionTypes.PersistAllCollectionsSuccess;
}
export class PersistAllCollectionsErrorAction implements Action {
  readonly type = ActionTypes.PersistAllCollectionsError;
  constructor(public payload: any) {}
}

export class LoadCollectionAction implements Action {
  readonly type = ActionTypes.LoadCollection;
  constructor(public payload: File) {}
}

export class LoadCollectionSuccessAction implements Action {
  readonly type = ActionTypes.LoadCollectionSuccess;
  constructor(public payload: any) {}
}

export class SaveCollectionAction implements Action {
  readonly type = ActionTypes.SaveCollection;
  constructor(public payload: CollectionData) {}
}

export class SaveCollectionSuccessAction implements Action {
  readonly type = ActionTypes.SaveCollectionSuccess;
}
export class SaveCollectionErrorAction implements Action {
  readonly type = ActionTypes.SaveCollectionError;
  constructor(public payload: any) {}
}

export class PersistCollectionAction implements Action {
  readonly type = ActionTypes.PersistCollection;
  constructor(public payload: CollectionData) {}
}
export class PersistCollectionSuccessAction implements Action {
  readonly type = ActionTypes.PersistCollectionSuccess;
  constructor(public payload: any) {}
}
export class PersistCollectionErrorAction implements Action {
  readonly type = ActionTypes.PersistCollectionError;
  constructor(public payload: any) {}
}
export class AnalyzeAction implements Action {
  readonly type = ActionTypes.Analyze;
  constructor(public payload: CollectionData) {}
}
export class AnalyzeAllAction implements Action {
  readonly type = ActionTypes.AnalyzeAll;
}

export class ElasticInsertAction implements Action {
  readonly type = ActionTypes.ElasticInsert;
  constructor(public payload: any) {}
}

export class ElasticInsertSuccessAction implements Action {
  readonly type = ActionTypes.ElasticInsertSuccess;
}

export class ElasticInsertErrorAction implements Action {
  readonly type = ActionTypes.ElasticInsertError;
  constructor(public payload: any) {}
}

export class ElasticBulkAction implements Action {
  readonly type = ActionTypes.ElasticBulk;
  constructor(public payload: any) {}
}

export class ElasticBulkSuccessAction implements Action {
  readonly type = ActionTypes.ElasticBulkSuccess;
}

export class ElasticBulkErrorAction implements Action {
  readonly type = ActionTypes.ElasticBulkError;
  constructor(public payload: any) {}
}

export class ElasticDeleteAction implements Action {
  readonly type = ActionTypes.ElasticDelete;
  constructor(public payload: string) {}
}

export class ElasticDeleteSuccessAction implements Action {
  readonly type = ActionTypes.ElasticDeleteSuccess;
}

export class ElasticDeleteErrorAction implements Action {
  readonly type = ActionTypes.ElasticDeleteError;
  constructor(public payload: any) {}
}

export class SuccessAction implements Action {
  readonly type = ActionTypes.Success;
}

export class ErrorAction implements Action {
  readonly type = ActionTypes.Error;
  constructor(public payload: any) {}
}

export class ClearStateAction implements Action {
  readonly type = ActionTypes.ClearState;
}

export type AdminActionsUnion =
  | RetrieveCollectionAction
  | RetrieveCollectionSuccessAction
  | RetrieveCollectionErrorAction
  | RetrieveAllCollectionsAction
  | RetrieveAllCollectionsConfiremedAction
  | RetrieveAllCollectionsCancelledAction
  | RetrieveAllCollectionsSuccessAction
  | RetrieveAllCollectionsErrorAction
  | RetrieveCollectionSuccessAction
  | LoadCollectionAction
  | LoadCollectionSuccessAction
  | SaveCollectionAction
  | SaveCollectionSuccessAction
  | SaveCollectionErrorAction
  | PersistCollectionAction
  | PersistCollectionSuccessAction
  | PersistCollectionErrorAction
  | PersistAllCollectionsAction
  | PersistAllCollectionsConfirmedAction
  | PersistAllCollectionsCancelledAction
  | PersistAllCollectionsSuccessAction
  | PersistAllCollectionsErrorAction
  | SaveAllCollectionsAction
  | SaveAllCollectionsConfiremedAction
  | SaveAllCollectionsCancelledAction
  | SaveAllCollectionsSuccessAction
  | SaveAllCollectionsErrorAction
  | AnalyzeAction
  | AnalyzeAllAction
  | ElasticInsertAction
  | ElasticInsertSuccessAction
  | ElasticInsertErrorAction
  | ElasticBulkAction
  | ElasticBulkSuccessAction
  | ElasticBulkErrorAction
  | ElasticDeleteAction
  | ElasticDeleteSuccessAction
  | ElasticDeleteErrorAction
  | SuccessAction
  | ErrorAction
  | ClearStateAction;
