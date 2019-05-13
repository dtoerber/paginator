import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType, EffectsModule } from '@ngrx/effects';
import * as fromActions from './actions';
import { DataService } from '../../services/data.service';
import { FirestoreService } from '../../services/firestore.service';
@Injectable()
export class PageEffects {
  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.LoadAction>(fromActions.ActionTypes.Load),
    tap(() => new fromActions.SetLoadingAction(true)),
    switchMap(action => {
      return this.data.retrieveInitialPeople(action.payload).pipe(
        switchMap(data => [
          new fromActions.LoadSuccessAction(data),
          new fromActions.SetLoadingAction(false)
        ]),

        catchError(err => of(new fromActions.LoadErrorAction(err)))
      );
    })
  );

  @Effect()
  next$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.NextPageAction>(fromActions.ActionTypes.NextPage),
    switchMap(action => {
      return this.data.retrievePeopleNextPage(action.payload).pipe(
        switchMap(data => [
          new fromActions.LoadSuccessAction(data),
          new fromActions.SetLoadingAction(false)
        ]),
        catchError(err => of(new fromActions.LoadErrorAction(err)))
      );
    })
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

  constructor(
    private actions$: Actions,
    private data: DataService,
    private firestore: FirestoreService
  ) {}
}
