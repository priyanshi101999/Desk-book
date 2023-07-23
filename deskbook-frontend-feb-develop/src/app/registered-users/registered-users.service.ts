import { UserProfileViewComponent } from './user-profile-view/user-profile-view.component';
import { HttpClient } from '@angular/common/http';
import { ComponentRef,Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OverlayConfig, OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';



@Injectable({
  providedIn: 'root'
})
export class RegisteredUsersService {
  url = environment.apiUrl;
  empID : string = '';
  urls = environment.java_url;


  constructor(private overlay: Overlay, private http: HttpClient) { }

  // Admin overlay
  public openOverlay(empid: string): void {
    let componentRef: ComponentRef<UserProfileViewComponent>;

    let overlayRef: OverlayRef;

    const overlayConfig: OverlayConfig = new OverlayConfig();
    overlayConfig.hasBackdrop = true;
    // create overlay reference
    overlayRef = this.overlay.create(overlayConfig);
    const portal: ComponentPortal<UserProfileViewComponent>
      = new ComponentPortal<UserProfileViewComponent>(UserProfileViewComponent);
    // attach overlay with portal
    componentRef = overlayRef.attach(portal);
    componentRef.instance.id = empid;
    
    this.empID = empid;

    componentRef.instance.cancelPopup.subscribe((data:boolean) => {
      overlayRef.detach();
    });
  }

  // getFloor(cityId: any) {
  //   return this.http.get(this.urls + "deskbook/floors/" + cityId);
  // }

  // getColumn(floorId: any) {
  //   return this.http.get(this.urls + "deskbook/columns/" + floorId);
  // }

   getUserProfileView() {
      return this.http.get(this.url + '/users/' + this.empID);
  }

  // getSeat(columnId: any) {
  //   return this.http.get(this.urls + "deskbook/seats/" + columnId);
  // }


  // API to update status of employee
  statusChange(data: object) {
    return this.http.put(this.url + '/users/status', data);
  }
  // get Register Users Api
  getRegisterUsers(pageNo: number, pageSize: number) {
    return this.http.get(
      this.url + '/users?pageNo=' + pageNo + '&pageSize=' + pageSize
    );
  }

  search(pageNo: number, pageSize: number, xyz = '') {
    return this.http.get(

      this.url + '/users?pageNo=' + pageNo + '&pageSize=' + pageSize + '&q=' + xyz

    );

  }

}
