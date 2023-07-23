import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { RegisteredUsersService } from '../registered-users.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.scss']
})
export class UserProfileViewComponent implements OnInit {

  @Input() id: any;
  @Output() cancelPopup = new EventEmitter<boolean>();
  userDatas: any = [];
  base64String: any;
  seatNo: any;
  column: any;
  floor: any;
  url: any;
  constructor(private loaderService: LoaderService, private registeredUsersService: RegisteredUsersService, private sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
    this.getUserProfileView();

    console.log('ID', this.id);
    
  }
  onImageError() {
    this.url = '../../../../assets/images/profile-photo.png';
  }
  getUserProfileView() {
    this.loaderService.showLoader(true);
    this.registeredUsersService.getUserProfileView().subscribe((res: any) => {
      console.log(res.data);
      
      this.loaderService.showLoader(false);
      this.userDatas = res.data;
      this.base64String = res.data.profilePictureFileString;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
        'data:image/jpg;base64,' + this.base64String
      );
      // if (this.userDatas.floor) {
      //   this.getFloor(this.userDatas.city.id);
      // }
      // if (this.userDatas.column) {
      //   this.getColumn(this.userDatas.floor.id);
      // }
      // if (this.userDatas.seat) {
      //   this.getAllSeat(this.userDatas.column.id);
      // }
    });
  }




  // getFloor(data: any) {
  //   this.registeredUsersService.getFloor(data).subscribe((res: any) => {
  //     this.floor = res.data;
  //   });
  // }

  // get Cloumn method
  // getColumn(data: any) {
  //   this.registeredUsersService.getColumn(data).subscribe((res: any) => {
  //     this.column = res.data;
  //   });
  // }

  // // get Seat method
  // getAllSeat(data: any) {
  //   this.registeredUsersService.getSeat(data).subscribe((res: any) => {
  //     this.seatNo = res.data.map((object: any) => {
  //       if (object.booked === true) {
  //         return { ...object, disabled: true };
  //       } else {
  //         return { ...object, disabled: false };
  //       }
  //     });
  //   });
  // }

  cancelOverlay() {
    this.cancelPopup.emit(true);
  }
}
