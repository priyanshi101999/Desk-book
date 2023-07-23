import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserProfileOverlayService } from 'src/app/shared/services/user-profile-overlay.service';
import { UserProfileService } from '../../services/user-profile/user-profile.service';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { UpdateProfileModalComponent } from 'src/app/dashboard/update-profile-modal/update-profile-modal.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit {
  flag: boolean = false;
  userRole: string | null;
  user!:  boolean;
  constructor(
    private _authService: AuthService,
    private userProfileOverlayService: UserProfileOverlayService,
    private userProfileService: UserProfileService,
    private overlay: Overlay,
    private router: Router
  ) {
    this.userRole = sessionStorage.getItem('role');
    
    if (this.userRole === 'EMPLOYEE') {
      this.user = false;
    } else if (this.userRole === 'SUPER_ADMIN') {
      this.user = true;
    }
  }

  ngOnInit(): void {
  }

  public openOverlay(): void {
    this.userProfileOverlayService.openOverlay();
  }

  // logout button
  public logout() {
    this._authService.logout();
  }

  getFlagValue() {
    this.userProfileService.getFlag().subscribe((res: any) => {
      this.flag = res.data.updated;

      if (!this.flag) {
        this.landingModal();
      }
    });
  }

  getFlagValueBookseat() {
    this.userProfileService.getFlag().subscribe((res: any) => {
      this.flag = res.data.updated;

      if (!this.flag) {
        this.landingModal();
      } else {
        this.router.navigate(['/bookseat']);
      }
    });
  }

  public landingModal(): void {
    const target = document.querySelector('#btn') as HTMLElement;
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: 'mat-elevation-z8',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });
    const component = new ComponentPortal(UpdateProfileModalComponent);
    const componentRef = overlayRef.attach(component);
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }
}


