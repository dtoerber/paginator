import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Result } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchFirstName(searchStr: string): Observable<any> {
    return this.http.get<Array<Result>>(
      `http://localhost:9200/people/_search?q=firstName:${searchStr}*`
    );
  }

  searchLastName(searchStr: string): Observable<any> {
    return this.http.get<Array<Result>>(
      `http://localhost:9200/people/_search?q=lastName:${searchStr}*`
    );
  }

  searchPhone(searchStr: string): Observable<any> {
    return this.http.get<Array<Result>>(
      `http://localhost:9200/people/_search?q=phone:*${searchStr}*`
    );
  }

  searchDOI(searchStr: string): Observable<any> {
    return this.http.get<Array<Result>>(
      `http://localhost:9200/people/_search?q=doi:*${searchStr}*`
    );
  }

  search(): Observable<any> {
    return this.http.get<Array<Result>>(`http://localhost:9200/people/_search`);
  }
}
