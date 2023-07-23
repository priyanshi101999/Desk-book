import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-update-status-modal',
  templateUrl: './update-status-modal.component.html',
  styleUrls: ['./update-status-modal.component.scss']
})
export class UpdateStatusModalComponent implements OnInit {

  @Input() ifToggle : boolean | undefined;
  @Output() cancelPopup = new EventEmitter<boolean>();

  ifActive : string = "Change status to Inactive?";
  ifInActive : string = "Change status to Active?";
  
  constructor() { 
  }

  ngOnInit(): void {
  }

  // variable to open modal
  popup = true;

  // If User Click Yes button on modal
  ToggleSwitch()
  {
    this.cancelPopup.emit(true)
  }

  // If User Click No button on modal
  public closePopover() {
    this.cancelPopup.emit(false)
  }

  // code to handle backdrop
  handleBackdropClick() {
    this.closePopover();
  }

}
