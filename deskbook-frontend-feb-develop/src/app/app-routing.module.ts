import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCallbackComponent } from './core/components/auth-callback/auth-callback.component';
import { MasterComponent } from './core/components/master/master.component';
import { AuthGuard } from './core/services/guard/auth.guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
const routes: Routes = [

  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  },
  {
    path: '404-page-not-found',
    component: PageNotFoundComponent
  },

  {
    path: 'registration',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
    // canActivate: [AuthGuard]
  },
  {
    path: '',
    component: MasterComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'bookseat',
        loadChildren: () => import('./book-seat/book-seat.module').then(m => m.BookSeatModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'registered-users',
        loadChildren: () => import('./registered-users/registered-users.module').then(m => m.RegisteredUsersModule),
        canActivate: [AuthGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
