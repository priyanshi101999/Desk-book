import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';
import {UserProfileComponent } from 'src/app/core/components/user-profile/user-profile.component';

@Injectable({
  providedIn: 'root'
})
export class UserProfileOverlayService {
  constructor(private overlay: Overlay) { }

  public openOverlay(): void {
    let componentRef: ComponentRef<UserProfileComponent>;

    let overlayRef: OverlayRef;

    const overlayConfig: OverlayConfig = new OverlayConfig();
    overlayConfig.hasBackdrop = true;
    // create overlay reference
    overlayRef = this.overlay.create(overlayConfig);
    const portal: ComponentPortal<UserProfileComponent>
      = new ComponentPortal<UserProfileComponent>(UserProfileComponent);
    // attach overlay with portal
    componentRef = overlayRef.attach(portal);
    componentRef.instance.data = 'test';

    componentRef.instance.cancelPopup.subscribe((data:boolean) => {
      overlayRef.detach();
    });
  }
}
