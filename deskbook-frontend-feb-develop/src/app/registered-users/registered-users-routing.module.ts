import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisteredUsersModule } from './registered-users.module';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';

const routes: Routes = [
  {
    path: '',
    component: RegisteredUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisteredUsersRoutingModule { }
