import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { UpdateProfileModalComponent } from './update-profile-modal/update-profile-modal.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UpdateProfileModalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  entryComponents: [
    UpdateProfileModalComponent
  ]
})
export class DashboardModule { }
