import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService,private route:Router) {}

  routeGuard(path:any){
    
    if(sessionStorage['role'] ==='EMPLOYEE' && path==='registered-users'){
    this.route.navigate(['404-page-not-found']);
    }
    else if(sessionStorage['role'] ==='SUPER_ADMIN' && (path==='dashboard' || path==='bookseat' )){
      this.route.navigate(['404-page-not-found']);
    }
  }
  /** Route Gaurd for Authentication */
  public canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    let link = route.url[0]?.path;    
    this.routeGuard(link);
    
    return this.getUser();
  }
  public async getUser(): Promise<boolean>  {
  
    let loggedIn: boolean = false;
    const user: any = await this._authService.getUser();
    if (user) {
      loggedIn = true;
    } else {
      loggedIn = false;
      this._authService.login();
    }
    return loggedIn;
  } 
  
}
