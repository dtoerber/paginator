import { Component } from '@angular/core';
import { PageFacade } from '../../+state/facade';
import { Person } from '../../../models';
import * as faker from 'faker';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
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
}
