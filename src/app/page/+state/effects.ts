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
      return this.firestore.col$(`items`).pipe(
        map(data => new fromActions.LoadSuccessAction(data)),
        catchError(err => of(new fromActions.LoadErrorAction(err)))
      );
    })
  );

  constructor(private actions$: Actions, private firestore: FirestoreService) {}
}
