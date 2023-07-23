import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { UpdateProfileModalComponent } from '../components/update-profile-modal/update-profile-modal.component';

@Injectable()
export class UpdateProfileModalService {
url:string;
  constructor(private http: HttpClient) { 
    this.url = environment.java_url;
  }

  getFlag(){
    return this.http.get(this.url + "api/deskbook/cities");
  }
}
