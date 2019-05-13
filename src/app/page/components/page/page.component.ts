import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { tap, map, finalize, take } from 'rxjs/operators';
import { PageFacade } from '../../+state/facade';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Person } from '../../../models';
import * as faker from 'faker';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Person>();

  // HTML Elements for Table Pagination and Sorting
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  loading = false;

  displayedColumns = ['name', 'email'];

  constructor(public page: PageFacade) {}

  create() {
    const person: Person = {
      name: faker.name.findName(),
      email: faker.internet.email()
    };
    this.page.save(person);
  }

  ngOnInit() {
    this.page.people$.subscribe(people => {
      this.dataSource.data = people;
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
          console.log(val);
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
}
