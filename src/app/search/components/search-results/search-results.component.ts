import { Component } from '@angular/core';
import { SearchFacade } from '../../+state/facade';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  constructor(public search: SearchFacade) {}
}
