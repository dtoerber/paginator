import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CollectionPromptComponent } from '../components';
import { AdminService } from '../services/admin.service';
import * as fromStore from './admin.actions';

@Injectable()
export class AdminEffects {
  @Effect()
  retrieveCollection$: Observable<Action> = this.actions$.pipe(
    ofType<fromStore.RetrieveCollectionAction>(
      fromStore.ActionTypes.RetrieveCollection
    ),
    switchMap(action =>
      this.adminService.retrieve(action.payload).pipe(
        map(results => {
          return new fromStore.RetrieveCollectionSuccessAction(results);
        }),
        catchError(err => of(new fromStore.RetrieveCollectionErrorAction(err)))
      )
    )
  );

  @Effect()
  persistCollection$: Observable<Action> = this.actions$.pipe(
    ofType<fromStore.PersistCollectionAction>(
      fromStore.ActionTypes.PersistCollection
    ),
    switchMap(action => {
      return this.adminService.persist(action.payload).pipe(
        map(results => {
          return new fromStore.PersistCollectionSuccessAction(results);
        }),
        catchError(err => of(new fromStore.PersistCollectionErrorAction(err)))
      );
    }),
    catchError(err => of(new fromStore.ErrorAction(err)))
  );

  @Effect()
  saveCollection$: Observable<Action> = this.actions$.pipe(
    ofType<fromStore.SaveCollectionAction>(
      fromStore.ActionTypes.SaveCollection
    ),
    map(action => this.adminService.save(action.payload)),
    map(() => new fromStore.SaveCollectionSuccessAction()),
    catchError(err => of(new fromStore.SaveCollectionErrorAction(err)))
  );

  @Effect()
  retrieveAllCollectionsConfirmation$ = this.actions$.pipe(
    ofType<fromStore.RetrieveAllCollectionsAction>(
      fromStore.ActionTypes.RetrieveAllCollections
    ),
    exhaustMap(action => {
      // Open a modal dialog to confirm the user wants to archive a patient.
      return this.dialogService
        .open(CollectionPromptComponent, { data: action.payload })
        .afterClosed()
        .pipe(
          map(confirmed => {
            if (confirmed) {
              return new fromStore.RetrieveAllCollectionsConfiremedAction();
            } else {
              return new fromStore.RetrieveAllCollectionsCancelledAction();
            }
          })
        );
    })
  );

  @Effect()
  retrieveAll$: Observable<Action> = this.actions$.pipe(
    ofType<fromStore.RetrieveAllCollectionsConfiremedAction>(
      fromStore.ActionTypes.RetrieveAllCollectionsConfirmed
    ),
    switchMap(() =>
      this.adminService.retrieveAll().pipe(
        map(result => {
          return new fromStore.RetrieveAllCollectionsSuccessAction();
        }),
        catchError(err =>
          of(new fromStore.RetrieveAllCollectionsErrorAction(err))
        )
      )
    )
  );

  @Effect()
  persistAllCollectionsConfirmation$ = this.actions$.pipe(
    ofType<fromStore.PersistAllCollectionsAction>(
      fromStore.ActionTypes.PersistAllCollections
    ),
    exhaustMap(action => {
      // Open a modal dialog to confirm the user wants to archive a patient.
      return this.dialogService
        .open(CollectionPromptComponent, { data: action.payload })
        .afterClosed()
        .pipe(
          map(confirmed => {
            if (confirmed) {
              return new fromStore.PersistAllCollectionsConfirmedAction();
            } else {
              return new fromStore.PersistAllCollectionsCancelledAction();
            }
          })
        );
    })
  );

  @Effect()
  persistAll$: Observable<Action> = this.actions$.pipe(
    ofType<fromStore.PersistAllCollectionsConfirmedAction>(
      fromStore.ActionTypes.PersistAllCollectionsConfirmed
    ),
    switchMap(() =>
      this.adminService.persistAll().pipe(
        map(result => {
          return new fromStore.PersistAllCollectionsSuccessAction();
        }),
        catchError(err =>
          of(new fromStore.PersistAllCollectionsErrorAction(err))
        )
      )
    )
  );

  @Effect()
  saveAllCollectionsConfirmation$ = this.actions$.pipe(
    ofType<fromStore.SaveAllCollectionsAction>(
      fromStore.ActionTypes.SaveAllCollections
    ),
    exhaustMap(action => {
      // Open a modal dialog to confirm the user wants to archive a patient.
      return this.dialogService
        .open(CollectionPromptComponent, { data: action.payload })
        .afterClosed()
        .pipe(
          map(confirmed => {
            if (confirmed) {
              return new fromStore.SaveAllCollectionsConfiremedAction();
            } else {
              return new fromStore.SaveAllCollectionsCancelledAction();
            }
          })
        );
    })
  );

  @Effect()
  saveAll$: Observable<Action> = this.actions$.pipe(
    ofType<fromStore.SaveAllCollectionsConfiremedAction>(
      fromStore.ActionTypes.SaveAllCollectionsConfirmed
    ),
    map(() => this.adminService.saveAll()),
    map(() => new fromStore.SaveAllCollectionsSuccessAction()),
    catchError(err => of(new fromStore.SaveAllCollectionsErrorAction(err)))
  );

  @Effect()
  analyze$: Observable<Action> = this.actions$.pipe(
    ofType<fromStore.AnalyzeAction>(fromStore.ActionTypes.Analyze),
    map(action => this.adminService.analyze(action.payload)),
    map(() => new fromStore.SuccessAction())
  );

  @Effect()
  analyzeAll$: Observable<Action> = this.actions$.pipe(
    ofType<fromStore.AnalyzeAllAction>(fromStore.ActionTypes.AnalyzeAll),
    map(action => this.adminService.analyzeAll()),
    map(() => new fromStore.SuccessAction())
  );

  @Effect()
  elasticInsert$: Observable<Action> = this.actions$.pipe(
    ofType<fromStore.ElasticInsertAction>(fromStore.ActionTypes.ElasticInsert),
    switchMap(action =>
      this.adminService
        .elasticInsert(action.payload)
        .pipe(
          map(
            () => new fromStore.ElasticInsertSuccessAction(),
            catchError(err => of(new fromStore.ElasticInsertErrorAction(err)))
          )
        )
    )
  );

  @Effect()
  elasticBulk$: Observable<Action> = this.actions$.pipe(
    ofType<fromStore.ElasticBulkAction>(fromStore.ActionTypes.ElasticBulk),
    switchMap(action =>
      this.adminService.elasticBulkCreate(action.payload).pipe(
        map(() => new fromStore.ElasticBulkSuccessAction()),
        catchError(err => of(new fromStore.ElasticBulkErrorAction(err)))
      )
    )
  );

  @Effect()
  elasticDelete$: Observable<Action> = this.actions$.pipe(
    ofType<fromStore.ElasticDeleteAction>(fromStore.ActionTypes.ElasticDelete),
    switchMap(action =>
      this.adminService.elasticDelete(action.payload).pipe(
        map(() => new fromStore.ElasticDeleteSuccessAction()),
        catchError(err => of(new fromStore.ElasticDeleteErrorAction(err)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    private dialogService: MatDialog
  ) {}
}
