import { Component, OnInit } from '@angular/core';
import { RegisteredUsersService } from '../registered-users.service';
import { ToastrService } from 'ngx-toastr';
import { ComponentPortal } from '@angular/cdk/portal';
import { UpdateStatusModalComponent } from '../update-status-modal/update-status-modal.component';
import { Overlay } from '@angular/cdk/overlay';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.scss']
})
export class RegisteredUsersComponent implements OnInit {
  // search
  // no data
  noData: boolean;
  searchQuery: any;
  searchResults: any;

  //Registered User PageNo
  pageNo = 0;
  RegisterUsers: any;

  //Total Registered User
  usercount: number = 0;

  //Number of Registered Users per Page
  pageSize = 20;

  //Registered User Total Page
  TotalPage: number = 0;


  //Designation Array
  designationData: Array<string> =
    [
      "none","BA", "PM", "INFRA", "DEVOPS", "DEVELOPER", "ADMIN", "QA", "UI/UX", "HR", "ACCOUNTS"
    ]

  //Tableheader Array
  tableheader =
    [
      {
        no: " NO.",
        name: "NAME",
        dateofjoining: "DATE OF JOINING",
        email: "EMAIL",
        designation: "DESIGNATION",
        status: "STATUS",
        action: "ACTION",
      }
    ]

  //  variable to store employee ID
  empId: string = '';

  // Variable to assign updated status
  isActive: boolean = true;

  // ellipse action button
  editIcon = faPen
  ellipsis = faEllipsisH;
  constructor(private registeredUsersService: RegisteredUsersService,
    private toastr: ToastrService, private overlay: Overlay, private _authService: AuthService,) { this.noData = false }

  ngOnInit(): void {
    //First getRegisterUsers Call
    this.getRegisteredUsers();
  }

  // ellipse action button
  disablebtn(event: Event) {
    event.stopPropagation();
  }

  // API to get registered users
  getRegisteredUsers() {
    this.registeredUsersService.getRegisterUsers(this.pageNo, this.pageSize).subscribe((response: any) => {
      this.RegisterUsers = response.data.registeredUsers;
      this.usercount = response.data.userCount;
      this.TotalPage = this.usercount / this.pageSize;
    })
  }
  
// Infinite scroll implementation
onScroll() {
  this.pageNo++; // Increment the page number when loading more data
  if (this.pageNo <= this.TotalPage) {
  if (this.searchQuery) {
    this.registeredUsersService.search(this.pageNo, this.pageSize, this.searchQuery).subscribe(
      (response: any) => {
        if (response.data.registeredUsers.length >= 1) {
          this.RegisterUsers.push(...response.data.registeredUsers); // Append new data to the existing results
        }
      }
    );
  } else {
    // Empty search query, load more data for all users
    this.registeredUsersService.search(this.pageNo, this.pageSize).subscribe(
      (response: any) => {
        if (response.data.registeredUsers.length >= 1) {
          this.RegisterUsers.push(...response.data.registeredUsers); // Append new data to the existing results
        }
      },
    );
  }
}
}



  // search

  performSearch() {
    this.searchQuery = this.searchQuery.trim();
    this.searchQuery = this.searchQuery.replace(/\s{2,}/g, ' ');

    if (this.searchQuery) {
     
      this.pageNo = 0;
      this.registeredUsersService.search(this.pageNo, this.pageSize, this.searchQuery).subscribe((response: any) => {


        if ((response.data.registeredUsers.length >= 1)) {
          this.RegisterUsers = [];
          this.RegisterUsers = response.data.registeredUsers
          this.noData = false;

        } else {
          this.noData = true
          this.searchResults = {};
        }
      },
        (error) => {
          this.searchResults = {};
        }
      );
    } else {
      // Empty search query, display all data
      this.pageNo = 0;
     
      this.registeredUsersService.search(this.pageNo, this.pageSize).subscribe(
        (response: any) => {
          if ((response.data.registeredUsers.length >= 1)) {
            this.RegisterUsers = [];
            this.RegisterUsers = response.data.registeredUsers
            this.noData = false
          }
        },
        (error) => {
          this.searchResults = {};
        }
      );
    }
  }

  // When status is toggled
  onToggle(id: string, event: any): void {

    this.RegisterUsers.forEach((element: any) => {
      if (element.employeeId === id) {
        element.isActive = !element.isActive;


        if (!element.isActive) {
          this.updateProfileModal(element.isActive)
        }
        else {
          this.updateProfileModal(element.isActive)
        }

        this.isActive = element.isActive;
      }
    });

    this.empId = id;
  }

  // Function to call PUT API for updating employee status
  public updateStatus() {

    let updateData = {
      employeeId: this.empId,
      isActive: this.isActive
    }

    this.registeredUsersService.statusChange(updateData).subscribe((res: any) => {
      console.log("res", res);
    });
  }


  // overlay view
  public openOverlay(id: string): void {
    this.registeredUsersService.openOverlay(id);
  }

  // Code to open and close Modal
  public updateProfileModal(toggle: boolean): void {
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: 'mat-elevation-z8',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });
    const component = new ComponentPortal(UpdateStatusModalComponent);
    const componentRef = overlayRef.attach(component);
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());

    componentRef.instance.ifToggle = toggle;
    componentRef.instance.cancelPopup.subscribe((data: boolean) => {
      
      overlayRef.detach();
      if (data) {
        this.updateStatus();
        if (this.isActive) {
          this.toastr.success('The Account has been activated Successfully');
        }
        else {
          this.toastr.success('The Account has been inactivated Successfully');
        }

      }
      else {
        this.RegisterUsers.forEach((element: any) => {
          if (element.employeeId === this.empId) {
            element.isActive = !element.isActive;
          }
        })
      }
    });
  }

  // Function to Log out
  public logout() {
    this._authService.logout();
  }
}