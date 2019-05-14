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
  distinctUntilChanged
} from 'rxjs/operators';
import { PageFacade } from '../../+state/facade';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Person } from '../../../models';
import * as faker from 'faker';
import { DataService } from 'src/app/services/data.service';

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
  displayedColumns = ['lastName', 'firstName', 'email'];
  selectedId = '';

  myForm: FormGroup;

  constructor(
    public page: PageFacade,
    private fb: FormBuilder,
    private data: DataService
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
        debounceTime(750),
        map(val => val.search),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(val => {
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
    this.dataSource.paginator = this.paginator;
    this.paginator.page
      .pipe(
        map(val => {
          this.page.setItemsPerPage(val.pageSize);
          this.page.setCurrentPage(val.pageIndex);
          if ((val.pageIndex + 1) * val.pageSize >= val.length) {
            this.page.setLoading(true);
            this.page.loadNextPage(val.pageSize);
          }
        })
      )
      .subscribe();
    // this.dataSource.sort = this.sort;
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

  // next() {
  //   console.log(`Length: ${this.dataSource.data.length}`);
  //   console.log(`Current Page: ${this.paginator.pageIndex}`);
  //   console.log(`Number of Pages: `, this.paginator.getNumberOfPages());
  //   if (this.paginator.pageIndex + 1 === this.paginator.getNumberOfPages()) {
  //     this.page.loadNextPage();
  //   }

  //   if (this.paginator.hasNextPage()) {
  //     this.paginator.nextPage();
  //   }
  // }

  // previous() {
  //   if (this.paginator.hasPreviousPage()) {
  //     this.paginator.previousPage();
  //   }
  // }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
