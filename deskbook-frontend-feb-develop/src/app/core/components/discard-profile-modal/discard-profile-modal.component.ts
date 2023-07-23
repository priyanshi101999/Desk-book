import { Component, ComponentRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserProfileOverlayService } from 'src/app/shared/services/user-profile-overlay.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserProfileService } from '../../services/user-profile/user-profile.service';

@Component({
  selector: 'app-discard-profile-modal',
  templateUrl: './discard-profile-modal.component.html',
  styleUrls: ['./discard-profile-modal.component.scss']
})
export class DiscardProfileModalComponent{
  @Output() cancelPopup = new EventEmitter<boolean>();
  constructor() { }
  
  popup = true;

  closeOverlay()
  {
    this.cancelPopup.emit(true)
  }

  public closePopover() {
    this.popup = false;
  }

  handleBackdropClick() {
    this.closePopover();
  }


  // cancelOverlay() {
  //   this.cancelPopup.emit(true)
  // }
}
