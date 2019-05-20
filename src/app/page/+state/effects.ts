import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromActions from './actions';
import { DataService } from '../../services/data.service';
import { FirestoreService } from '../../services/firestore.service';
import { PageFacade } from './facade';
import { AppFacade } from '../../+state';
@Injectable()
export class PageEffects {
  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.LoadAction>(fromActions.ActionTypes.Load),
    switchMap(action => {
      return this.data.retrieveInitialPeople(action.payload).pipe(
        map(data => {
          this.app.setLoading(true);
          return new fromActions.LoadSuccessAction(data);
        }),
        catchError(err => of(new fromActions.LoadErrorAction(err)))
      );
    })
  );

  @Effect()
  next$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.NextPageAction>(fromActions.ActionTypes.NextPage),
    switchMap(action => {
      return this.data.retrievePeopleNextPage(action.payload).pipe(
        map(data => {
          this.app.setLoading(true);
          return new fromActions.LoadSuccessAction(data);
        }),
        catchError(err => of(new fromActions.LoadErrorAction(err)))
      );
    })
  );

  @Effect({ dispatch: false })
  loadSuccess$ = this.actions$.pipe(
    ofType<fromActions.LoadSuccessAction>(fromActions.ActionTypes.LoadSuccess),
    map(() => this.app.setLoading(false))
  );

  @Effect()
  save$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.SaveAction>(fromActions.ActionTypes.Save),
    switchMap(action =>
      of(this.firestore.addWithId(`people`, action.payload)).pipe(
        map(() => new fromActions.SaveSuccessAction()),
        catchError(err => of(new fromActions.LoadErrorAction(err)))
      )
    )
  );

  @Effect()
  retrieve$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.RetrieveAction>(fromActions.ActionTypes.Retrieve),
    switchMap(action => {
      return this.data.retrievePatients(action.payload).pipe(
        map(data => new fromActions.RetrieveSuccessAction(data)),
        catchError(err => of(new fromActions.RetrieveErrorAction(err)))
      );
    })
  );

  @Effect()
  retrieveSuccess$: Observable<Action> = combineLatest(
    this.actions$.pipe(
      ofType<fromActions.RetrieveSuccessAction>(
        fromActions.ActionTypes.RetrieveSuccess
      )
    ),
    this.page.ids$
  ).pipe(
    map(([action, ids]) => {
      const patients = action.payload;
      return new fromActions.SetFilterAction(patients[0].lastName);
    })
  );

  constructor(
    private actions$: Actions,
    private data: DataService,
    private firestore: FirestoreService,
    private page: PageFacade,
    private app: AppFacade
  ) {}
}
