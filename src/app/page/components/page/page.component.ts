import { Component, OnInit } from '@angular/core';
import { PageFacade } from '../../+state/facade';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  constructor(public page: PageFacade) {
    page.load();
  }

  ngOnInit() {}
}
