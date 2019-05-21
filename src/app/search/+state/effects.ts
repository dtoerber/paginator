import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromActions from './actions';
@Injectable()
export class SearchEffects {
  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.SearchAction>(fromActions.ActionTypes.Search),
    switchMap(action => {
      return this.search.search().pipe(
        map(data => {
          const results = [];
          const hits = data.hits.hits;
          hits.forEach(hit => {
            results.push(hit._source);
          });
          console.log(`results: `, results);
          return new fromActions.SearchSuccessAction(results);
        }),
        catchError(err => of(new fromActions.SearchErrorAction(err)))
      );
    })
  );
  constructor(private actions$: Actions, private search: SearchService) {}
}
