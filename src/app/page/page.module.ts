import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PageRoutingModule } from './page-routing.module';
import { MaterialModule } from '../material/material.module';
// Import Store files
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/reducer';
import { PageEffects } from './+state/effects';

import { PageComponent } from './components/page/page.component';

@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    PageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature('page', reducer),
    EffectsModule.forFeature([PageEffects])
  ]
})
export class PageModule {}
