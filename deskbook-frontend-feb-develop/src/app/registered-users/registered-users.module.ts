import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisteredUsersRoutingModule } from './registered-users-routing.module';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';
import { UpdateStatusModalComponent } from './update-status-modal/update-status-modal.component';
import { UserProfileViewComponent } from './user-profile-view/user-profile-view.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    RegisteredUsersComponent,
    UpdateStatusModalComponent,
    UserProfileViewComponent
  ],
  imports: [
    CommonModule,
    RegisteredUsersRoutingModule,
    InfiniteScrollModule,
    FormsModule,
    SharedModule,
    FontAwesomeModule,
    NgbPopoverModule
  ],
  entryComponents: [
    UpdateStatusModalComponent
  ]
})
export class RegisteredUsersModule { }
