import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
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

  displayedColumns = ['name', 'email'];

  constructor(public page: PageFacade) {
    page.load();
  }

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
    // Configure sortingDataAccessor because
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        default:
          return item[property];
      }
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
