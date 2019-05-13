import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromActions from './actions';
import { FirestoreService } from 'src/app/services/firestore.service';
@Injectable()
export class PageEffects {
  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.LoadAction>(fromActions.ActionTypes.Load),
    switchMap(() => {
      return this.firestore.col$(`people`).pipe(
        map(data => new fromActions.LoadSuccessAction(data)),
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

  constructor(private actions$: Actions, private firestore: FirestoreService) {}
}
