import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../core/services/user-profile/user-profile.service';
import { Router } from '@angular/router';
import { UpdateProfileModalService } from '../shared/services/update-profile-modal.service';
import { Overlay } from '@angular/cdk/overlay';
import { UpdateProfileModalComponent } from './update-profile-modal/update-profile-modal.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { DashboardService } from './dashboard.service';
import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  flag: any;
  cancelPopup: any;
  isActive: boolean;
  popup = false;

  constructor(private overlay: Overlay, private router: Router,
    private dashboard: DashboardService, private _authService: AuthService) {
      this.isActive = false;
     }

  ngOnInit(): void {
    this.getFlagValue();
  }

  public closePopover() {
    this.popup = false;
    // this.openOverlay();

  }

  handleBackdropClick() {
    this.closePopover();
  }

  // GET API for the flag stating if user profile is updated or not
  getFlagValue() {
    this.dashboard.getFlag().subscribe((res: any) => {

      this.flag = res.data.updated;
      this.isActive = res.data.active;

      if (this.isActive === true) {

        if (!this.flag) {
          this.landingModal();
        }
      }
      else {
        this.popup = true;
        this.cancelPopup;
        this.handleBackdropClick;
      }
    })
  }

  // for Book Seat Button
  onClickGetFlagValue() {
    this.dashboard.getFlag().subscribe((res: any) => {

      this.flag = res.data.updated;
      
      if (!this.flag) {
        this.landingModal();
      }
      else{
        this.router.navigate(['/bookseat']);
      }
    })
  }

  // Code to open Status Modal
  public landingModal(): void {
    const target = document.querySelector("#btn") as HTMLElement;
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: 'mat-elevation-z8',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });
    const component = new ComponentPortal(UpdateProfileModalComponent);
    const componentRef = overlayRef.attach(component);
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }

  public logout() {
    this._authService.logout();
  }
}
