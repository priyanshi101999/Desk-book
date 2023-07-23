import { Component } from '@angular/core';
import { UserProfileOverlayService } from 'src/app/shared/services/user-profile-overlay.service';

@Component({
  selector: 'app-update-profile-modal',
  templateUrl: './update-profile-modal.component.html',
  styleUrls: ['./update-profile-modal.component.scss']
})
export class UpdateProfileModalComponent {

  constructor(private userProfileOverlayService: UserProfileOverlayService) { }
  public openOverlay(): void {
    this.userProfileOverlayService.openOverlay();
  }

  popup = true;

  public closePopover() {
    this.popup = false;
    this.openOverlay();
  }

  handleBackdropClick() {
    this.closePopover();
  }

}
