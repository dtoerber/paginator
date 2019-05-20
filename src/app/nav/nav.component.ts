import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import {
  map,
  debounceTime,
  filter,
  distinctUntilChanged,
  takeUntil
} from 'rxjs/operators';
import { AppFacade } from '../+state';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  myForm: FormGroup;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    public app: AppFacade
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({ search: '' });
    this.myForm.valueChanges
      .pipe(
        debounceTime(500),
        map(val => val.search),
        filter(val => !!val),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(val => {
        console.log(val);
      });
  }
}
