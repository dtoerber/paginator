import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from './+state/admin.effects';
import { reducer } from './+state/admin.reducer';

import { MaterialModule } from '../material/material.module';

import {
  AdminContainerComponent,
  AdminComponent,
  CollectionPromptComponent
} from './components';

@NgModule({
  declarations: [
    AdminContainerComponent,
    AdminComponent,
    CollectionPromptComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    StoreModule.forFeature('admin', reducer),
    EffectsModule.forFeature([AdminEffects])
  ],
  entryComponents: [CollectionPromptComponent]
})
export class AdminModule {}
