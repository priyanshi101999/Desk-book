import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserProfileService } from '../../services/user-profile/user-profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderService } from '../../services/loader/loader.service';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DiscardProfileModalComponent } from '../discard-profile-modal/discard-profile-modal.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() data: any;
  @Output() cancelPopup = new EventEmitter<boolean>();
  edit: boolean;
  userProfileForm: any;
  submitted = false;
  seatNumber: any;
  isDirty: boolean = false;
  profilePictureChange : boolean;
  selectedFile: any;

  cityId: any;
  floorId: any;
  columnId: any;
  seatId: any;
  userData: any = [];
  days: any;
  daysData: any;
  designations = [];
  modeOfWork = [];
  checkmodeOFWork : any;
  atLeatOne: boolean;
  city = [];
  profilePictureFileString: any;
  floor = [];
  column = [];
  seatNo = [];
  base64String: any;
  // showIcon
  showIcon: boolean;
  // modeMessage
  modeMessage: boolean;
  // Regex patterns

  // Firstname and Lastname pattern
  namePattern = "^[A-Za-z]+(['?]{0,1}[A-Za-z]+)?$";

  // Phonenumber Pattern
  phoneNumberPattern = '^[0-9]+$';

  url: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userProfileService: UserProfileService,
    private sanitizer: DomSanitizer,
    private loaderService: LoaderService,
    private overlay: Overlay
  ) {
    // go to edit variable
    this.edit = false;
    // showIcon
    this.showIcon = false;
    // modeMessage
    this.modeMessage = false;
    // day message
    this.atLeatOne = false;
    // check profile picture change
    this.profilePictureChange = false;
  }

  popup = false;

  public closePopup() {
    this.popup = false;
  }
  handleBackdropClick() {
    this.closePopup();
  }

  ngOnInit(): void {
    this.getUserProfileView();
    this.getDesignation();
    this.getModeOfWork();
    this.getDays();
    this.getCities();
  }

  // get form controls
  get f(): { [key: string]: AbstractControl } {
    return this.userProfileForm.controls;
  }

  //  the complete user profile view method declaration
  getUserProfileView() {
    this.loaderService.showLoader(true);
    this.userProfileService.getUserProfileView().subscribe((res: any) => {
      this.loaderService.showLoader(false);
      this.userData = res.data;
      this.base64String = res.data.profilePictureFileString;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
        'data:image/jpg;base64,' + this.base64String
      );
      if (this.userData.floor) {
        this.getFloor(this.userData.city.id);
      }
      if (this.userData.column) {
        this.getColumn(this.userData.floor.id);
      }
      if (this.userData.seat) {
        this.getAllSeat(this.userData.column.id);
      }
    });
  }

  createUserForm() {
    this.edit = true;
    // Form builder
    this.userProfileForm = this.formBuilder.group({
      profilePictureFileString: [this.userData.profilePictureFileString],
      firstName: [
        this.userData.firstName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
          Validators.pattern(this.namePattern),
        ],
      ],
      lastName: [
        this.userData.lastName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
          Validators.pattern(this.namePattern),
        ],
      ],
      emailId: [{ value: this.userData.emailId, disabled: true }],
      phoneNumber: [
        this.userData.phoneNumber,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(this.phoneNumberPattern),
        ],
      ],
      designation: [
        this.userData.designation ? this.userData.designation.id : null,
        Validators.required,
      ],
      modeOfWork: [
        this.userData.modeOfWork ? this.userData.modeOfWork.id : null,
        Validators.required,
      ],
      days: new FormArray([]),
      city: [
        this.userData.city ? this.userData.city.id : null,
        Validators.required,
      ],
      floor: [
        this.userData.floor ? this.userData.floor.id : null,
        Validators.required,
      ],
      column: [
        this.userData.column ? this.userData.column.id : null,
        Validators.required,
      ],
      seatNo: [
        this.userData.seat ? this.userData.seat.id : null,
        Validators.required,
      ],
    });
    //deselecting values of city, floor, column,seatno when mode of work is changed
    this.userProfileForm.get('modeOfWork')?.valueChanges.subscribe(() => {
      this.userProfileForm.get('city')?.patchValue(null);
      this.userProfileForm.get('floor')?.patchValue(null);
      this.userProfileForm.get('column')?.patchValue(null);
      this.userProfileForm.get('seatNo')?.patchValue(null);
    });

    this.userProfileForm.get('city')?.valueChanges.subscribe(() => {
      this.userProfileForm.get('floor')?.patchValue(null);
      this.userProfileForm.get('column')?.patchValue(null);
      this.userProfileForm.get('seatNo')?.patchValue(null);
    });

    this.userProfileForm.get('floor')?.valueChanges.subscribe(() => {
      this.userProfileForm.get('column')?.patchValue(null);
      this.userProfileForm.get('seatNo')?.patchValue(null);
    });

    this.userProfileForm.get('column')?.valueChanges.subscribe(() => {
      this.userProfileForm.get('seatNo')?.patchValue(null);
    });

    if (
      !this.userProfileForm.controls['modeOfWork'].value ||
      (this.userProfileForm.controls['modeOfWork'].value === 2 &&
        !this.userProfileForm.controls['city'].value &&
        !this.userProfileForm.controls['floor'].value &&
        !this.userProfileForm.controls['seatNo'].value &&
        !this.userProfileForm.controls['column'].value)
    ) {
      this.userProfileForm.controls['city'].disable();
      this.userProfileForm.controls['floor'].disable();
      this.userProfileForm.controls['column'].disable();
      this.userProfileForm.controls['seatNo'].disable();
    }

    this.userProfileForm.controls['modeOfWork'].valueChanges.subscribe(
      (id: any) => {
        if (id === 2) {
          this.userProfileForm.controls['city'].disable();
          this.userProfileForm.controls['floor'].disable();
          this.userProfileForm.controls['column'].disable();
          this.userProfileForm.controls['seatNo'].disable();
        } else if (id === 1) {
          this.userProfileForm.controls['city'].enable();
          this.userProfileForm.controls['floor'].disable();
          this.userProfileForm.controls['column'].disable();
          this.resetDays();
          this.userProfileForm.controls['seatNo'].disable();
        } else {
          this.userProfileForm.controls['city'].enable();
          this.userProfileForm.controls['floor'].disable();
          this.userProfileForm.controls['column'].disable();
          this.userProfileForm.controls['seatNo'].disable();
        }
      }
    );

    //Floor Enable
    this.userProfileForm.controls['city'].valueChanges.subscribe(
      (value: any) => {
        if (!value) {
          this.userProfileForm.controls['floor'].disable();
        } else {
          this.userProfileForm.controls['floor'].enable();
        }
      }
    );

    //Column Enable
    this.userProfileForm.controls['floor'].valueChanges.subscribe(
      (value: any) => {
        if (!value) {
          this.userProfileForm.controls['column'].disable();
        } else {
          this.userProfileForm.controls['column'].enable();
        }
      }
    );

    //Seat Enable
    this.userProfileForm.controls['column'].valueChanges.subscribe(
      (value: any) => {
        if (!value) {
          this.userProfileForm.controls['seatNo'].disable();
        } else {
          this.userProfileForm.controls['seatNo'].enable();
        }
      }
    );

    this.addCheckboxes();
    this.informationIcon();
  }

  private addCheckboxes() {
    this.daysData.forEach((days: any) => {
      if (this.userData.days && this.userData.days.length > 0) {
        const selectedData = this.userData.days.filter(
          (data: any) => days.id === data.id
        );
        if (selectedData && selectedData.length > 0) {
          this.userFormArray.push(new FormControl(true));
        } else {
          this.userFormArray.push(new FormControl(false));
        }
      } else {
        this.userFormArray.push(new FormControl(false));
      }
    });
    // this.resetDays();
  }

  // show information icon when user data has hybrid in modeofWork
  informationIcon() {
    const workMode = this.userData.modeOfWork.name;
    if (workMode === 'Hybrid') {
      this.showIcon = true;
    }
  }
  get userFormArray() {
    return this.userProfileForm.controls.days as FormArray;
  }
  
  // Image Validation
  onSelect(event: any) {
    this.profilePictureChange = true;
    const input = event.target;
    const file = input.files && input.files[0];

    // Clear the previously selected file input value
    input.value = '';

    if (file) {
      const fileSizeMB = file.size / (1024 * 1024); // Size in MB
      const fileType = file.type;

      // Check size for <=2mb and file type
      if (
        fileSizeMB <= 2 &&
        (fileType === 'image/jpg' ||
          fileType === 'image/png' ||
          fileType === 'image/jpeg')
      ) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event: any) => {
          this.url = event.target.result as string;
          let imageData = this.url.split('base64,');
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
            'data:image/jpg;base64,' + imageData[1]
          );
          this.userProfileForm
            .get('profilePictureFileString')
            .setValue(this.url);
          return this.url;
        };
      } else if (
        fileSizeMB > 2 &&
        (fileType === 'image/jpg' ||
          fileType === 'image/png' ||
          fileType === 'image/jpeg')
      ) {
        this.toastr.error(
          'File size exceeds the maximum limit of 2MB. Please choose a smaller file'
        );
      } else {
        this.popup = true;
        this.cancelPopup;
        this.handleBackdropClick;
      }
    }
  }

  checkboxChanged(event: Event) {

    // Custom validation for maximum of 4 days and minimum 1 day 
    if (
      this.userFormArray.value.filter((value: boolean) => value === true)
        .length > 4
    ) {
      this.userFormArray.setErrors({ maxDays: true });
    } else if (
      this.userFormArray.value.filter((value: boolean) => value === true)
        .length <= 0
    ) {
      this.userFormArray.setErrors({ minDays: true });
    } else {
      this.userFormArray.setErrors(null);
    }
  }

  // capitalizeFirstLetter
  capitalizeFirstLetter(controlName: string) {
    const control = this.userProfileForm.get(controlName);
    let value = control?.value.trim();
    if (value.length > 0) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    control?.setValue(value);
  }

  designationselected(c: string) {}
  // Function to Show Information Icon
  modeOfWorkselected(mode: any) {
    this.checkmodeOFWork = mode.name;
    if (mode.name === 'Hybrid') {
     
      this.showIcon = true;
    } else {
      this.showIcon = false;
    }
  }
  resetDays() {
    let totalCheckBox = this.userFormArray.value;
    if (totalCheckBox.length > 0) {
      const falseArray = [false, false, false, false, false];
      this.userFormArray.get('value')?.setValue(falseArray);
      this.userFormArray.controls.forEach((element: any) => {
        if (element.value === true) {
          element.value = false;
        }
      });
    }
  }

  // showMessage()
  showMessage() {
    this.modeMessage = true;
    setTimeout(() => {
      this.modeMessage = false;
    }, 3000);
  }

  // cityselceted and Floor Api Call
  cityselected(c: any) {
    let cityId = c.id;
    this.getFloor(cityId);
  }

  // floorselceted and Column Api Call
  floorselected(data: any) {
    this.floorId = data.id;
    this.getColumn(this.floorId);
  }
  // columnselceted and Seat Api Call
  columnselected(data: any) {
    this.columnId = data.id;
    this.getAllSeat(this.columnId);
  }

  // get Designation method
  getDesignation() {
    this.userProfileService.getDesignation().subscribe((res: any) => {
      this.designations = res.data;
    });
  }
  // get ModeOFWork method
  getModeOfWork() {
    this.userProfileService.getModeOfWork().subscribe((res: any) => {
      this.modeOfWork = res.data;
    });
  }

  // get Day method
  getDays() {
    this.userProfileService.getDays().subscribe((res: any) => {
      this.daysData = res.data;
    });
  }
  // get City method
  getCities() {
    this.userProfileService.getCity().subscribe((res: any) => {
      this.city = res.data;
    });
  }

  // get Floor method
  getFloor(data: any) {
    this.userProfileService.getFloor(data).subscribe((res: any) => {
      this.floor = res.data;
    });
  }

  // get Cloumn method
  getColumn(data: any) {
    this.userProfileService.getColumn(data).subscribe((res: any) => {
      this.column = res.data;
    });
  }

  // get Seat method
  getAllSeat(data: any) {
    this.userProfileService.getSeat(data).subscribe((res: any) => {
      this.seatNo = res.data.map((object: any) => {
        if (object.booked === true) {
          return { ...object, disabled: true };
        } else {
          return { ...object, disabled: false };
        }
      });
    });
  }

  // show user profile
  userProfileEdit() {
    this.edit = true;
  }

  // Check if form is dirty
  checkIfDirty() {
    this.isDirty =
      this.userProfileForm.get('firstName').dirty ||
      this.userProfileForm.get('lastName').dirty ||
      this.userProfileForm.get('phoneNumber').dirty ||
      this.userProfileForm.get('designation').dirty ||
      this.userProfileForm.get('modeOfWork').dirty ||
      this.userProfileForm.get('city').dirty ||
      this.userProfileForm.get('days').dirty ||
      this.userProfileForm.get('floor').dirty ||
      this.userProfileForm.get('column').dirty ||
      this.userProfileForm.get('seatNo').dirty ||
      this.profilePictureChange;


    if (this.isDirty) {
      this.updateProfileModal();
    } else {
      this.cancelOverlay();
    }
  }

  cancelOverlay() {
    this.cancelPopup.emit(true);
  }

  // onImageError
  onImageError() {
    this.url = '../../../../assets/images/profile-photo.png';
  }

  // method execute on form submit
  onSubmit(): void {
    this.submitted = true;
    if (this.userProfileForm.invalid) {
      return;
    }
    this.profilePictureChange = false;
    let dayArray: any = [];
    this.userProfileForm.value.days.forEach((formData: any, index: number) => {
      if (formData) {
        dayArray.push(this.daysData[index].id);
      }
      return;
    });
    if(this.checkmodeOFWork === 'Hybrid'){
      if (!dayArray.length) {    
        this.userFormArray.setErrors({ minDays: true });
        return;
      }
    }
    // send body data to server
    let bodyData = {
      profilePictureFileString: this.url.changingThisBreaksApplicationSecurity
        ? this.url.changingThisBreaksApplicationSecurity
        : null,
      firstName: this.userProfileForm.get('firstName').value
        ? this.userProfileForm.get('firstName').value
        : null,
      lastName: this.userProfileForm.get('lastName').value
        ? this.userProfileForm.get('lastName').value
        : null,
      phoneNumber: this.userProfileForm.get('phoneNumber').value
        ? this.userProfileForm.get('phoneNumber').value
        : null,
      designation: this.userProfileForm.get('designation').value
        ? this.userProfileForm.get('designation').value
        : null,
      modeOfWork: this.userProfileForm.get('modeOfWork').value
        ? this.userProfileForm.get('modeOfWork').value
        : null,
      city: this.userProfileForm.get('city').value
        ? this.userProfileForm.get('city').value
        : null,
      floor: this.userProfileForm.get('floor').value
        ? this.userProfileForm.get('floor').value
        : null,
      column: this.userProfileForm.get('column').value
        ? this.userProfileForm.get('column').value
        : null,
      seat: this.userProfileForm.get('seatNo').value
        ? this.userProfileForm.get('seatNo').value
        : null,
      workingDays: dayArray,
    };

    this.userProfileService.postData(bodyData).subscribe(
      (response) => {
        this.getUserProfileView();
        // Handle the success response
        this.toastr.success('Profile successfully updated');
        this.edit = false;
      },
      (error) => {}
    );
  }

  getFlagValue() {
    this.userProfileService.getFlag().subscribe((res: any) => {
    });
  }

  public updateProfileModal(): void {
    const target = document.querySelector('#btn') as HTMLElement;

    const overlayRef1 = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: 'mat-elevation-z8',
      // positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });
    const component = new ComponentPortal(DiscardProfileModalComponent);
    const componentRef = overlayRef1.attach(component);
    overlayRef1.backdropClick().subscribe(() => overlayRef1.detach());

    componentRef.instance.cancelPopup.subscribe((data: boolean) => {
      overlayRef1.detach();
      this.cancelOverlay();
    });
  }
}
