import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  map,
  debounceTime,
  takeUntil,
  filter,
  distinctUntilChanged
} from 'rxjs/operators';
import { PageFacade } from '../../+state/facade';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Person } from '../../../models';
import * as faker from 'faker';
import { AppFacade } from 'src/app/+state';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  dataSource = new MatTableDataSource<Person>();

  // HTML Elements for Table Pagination and Sorting
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  loading = false;
  displayedColumns = ['id', 'lastName', 'firstName', 'email', 'phone'];
  selectedId = '';

  myForm: FormGroup;

  constructor(
    public page: PageFacade,
    private fb: FormBuilder,
    private app: AppFacade
  ) {}

  ngOnInit() {
    this.page.people$.pipe(takeUntil(this.destroy$)).subscribe(people => {
      this.dataSource.data = people;

      this.page.selectedId$
        .pipe(takeUntil(this.destroy$))
        .subscribe(id => (this.selectedId = id));
    });

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
        this.page.setFilter(val);
        console.log(val);
      });
  }

  // Use AfterViewInit to wire up <mat-table>
  ngAfterViewInit() {
    this.page.load(this.paginator.pageSize);

    // Configure sortingDataAccessor because
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        default:
          return item[property];
      }
    };

    this.page.filter$.subscribe(
      filterValue => (this.dataSource.filter = filterValue.trim().toLowerCase())
    );

    this.dataSource.paginator = this.paginator;
    this.paginator.page
      .pipe(
        map(val => {
          this.page.setItemsPerPage(val.pageSize);
          this.page.setCurrentPage(val.pageIndex);
          if ((val.pageIndex + 1) * val.pageSize >= val.length) {
            this.app.setLoading(true);
            this.page.loadNextPage(val.pageSize);
          }
        })
      )
      .subscribe();
    this.dataSource.sort = this.sort;
  }

  create() {
    const person = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      address: this.getAddress(),
      phone: faker.phone.phoneNumberFormat(1),
      DOB: faker.date.past(),
      DOI: faker.date.past()
    };

    this.page.save(person);
  }

  getAddress() {
    return {
      streetAddress1: faker.address.streetAddress(),
      streetAddress2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode()
    };
  }

  onSelect(person: Person) {
    this.page.setSelectedId(person.id);
  }

  load() {
    const patients = [
      '6tsdlF1NwUYEACQlkj3P',
      '9MNKyTXh7291u3GG3r1H',
      'HQErjstsp5vrMaZyTrNi'
    ];
    this.page.retrieve(patients);
    this.page.setSelectedId(patients[0]);
  }

  setPage(id: number) {
    this.page.setCurrentPage(id);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
