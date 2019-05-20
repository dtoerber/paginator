import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';

import { MaterialModule } from '../material/material.module';
// Import Store files
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/reducer';
import { SearchEffects } from './+state/effects';

import { SearchResultsComponent } from './components/search-results/search-results.component';

@NgModule({
  declarations: [SearchResultsComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MaterialModule,
    StoreModule.forFeature('search', reducer),
    EffectsModule.forFeature([SearchEffects])
  ]
})
export class SearchModule {}
