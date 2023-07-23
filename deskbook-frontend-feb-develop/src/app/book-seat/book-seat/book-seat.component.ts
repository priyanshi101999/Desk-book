import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { BookSeatService } from '../service/book-seat.service';

@Component({
  selector: 'app-book-seat',
  templateUrl: './book-seat.component.html',
  styleUrls: ['./book-seat.component.scss']
})
export class BookSeatComponent implements OnInit {

  // array to display numbers on book seat page
  public seatCount: Array<number> = [];
  public seatCnt : number = 0;
  
  // get Floor value on change
  public floorChange: string = '';

  // Filter form group
  filterForm!: FormGroup;

  // datepicker config
  minDate: Date;
  maxDate: Date;
  date: Date;

  // store value of Floor API
  floor: any;

  // store value of City API
  city: any;

  // Store value of seat configuration
  seatView: any;

  // Store date format to send to API
  newDate: string = '';

  // flags to enable filters dropdown
  enableFloorFlag: boolean = false;
  enableDateFlag: boolean = false;
  enableCityFlag: boolean = false;

  constructor(
    private fb: FormBuilder, private http: HttpClient, private bookSeatService: BookSeatService) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.date = new Date();

    this.minDate.setDate(this.minDate.getDate() + 2);
    this.maxDate.setDate(this.maxDate.getDate() + 91);
    this.filterForm = new FormGroup({
      city: new FormControl(),
      floor: new FormControl(),
      date: new FormControl(),
    });
  }

  ngOnInit(): void {
    // reset city and floor when date value changes and disabling floor as date changes
    // this.filterForm.get('date')?.valueChanges.subscribe(() => {
    //   this.filterForm.get('city')?.patchValue(null);
    //   this.filterForm.controls['floor'].disable();
    //   this.filterForm.get('floor')?.patchValue(null);
    // })

    // Seat count of seats in a column
    // this.seatCountFunction();

    // reset floor when city value changes
    this.filterForm.get('city')?.valueChanges.subscribe(() => {
      this.filterForm.get('floor')?.patchValue(null);
    })

    // call City API on page load
    this.getCity();

    // Enable floor dropdown 
    this.enableFloor();
  }


  // onChange event Methods to get selected values from filters

  // get city onchange value
  onChangeCity(event: object) {
    this.bookSeatService.selectedCity(event);
    this.getFloor();

    this.enableFloorFlag = true;
    this.enableFloor();
  }

  // get Floor onchange value
  onChangeFloor(event: any) {
    this.floorChange = event.name;
    this.enableCityFlag = true;
    this.isFormValid();
  }

  // get date onchange value
  onChangeDate(value: Date): void {

    this.date = value;

    // Function to convert date into mm/dd/yyyy format
    this.dateConfiguration(value);

    if (this.date) {
      this.enableDateFlag = true;
      this.isFormValid();
    }
    // Enable floor dropdown 
    // this.enableFloor();
  };

  // Change Date Format to mm/dd/yyyy
  dateConfiguration(dateString: Date) {
    const d = new Date(dateString);
    let dd = '';
    let mm = '';
    let yyyy = d.getFullYear();

    if (d.getDate() < 10) {
      dd = '0' + d.getDate();
    }
    else {
      dd = '' + d.getDate();
    }

    if (d.getMonth() < 10) {
      mm = '0' + d.getMonth();
    }
    else {
      mm = '' + d.getMonth();
    }

    this.newDate = mm + '/' + dd + '/' + yyyy;

    this.bookSeatService.dateChange(this.newDate);
  }

  // enable dropdown for selecting Floor
  enableFloor() {
    if (this.enableFloorFlag) {
      this.filterForm.controls['floor'].enable();
    }
    else {
      this.filterForm.controls['floor'].disable();
    }
  }

  // Function to check flags and call Seat configuration API
  isFormValid() {
    if (this.enableFloorFlag && this.enableDateFlag && this.enableCityFlag) {
      this.getSeatView();
    }
  }

  // API CALLS
  // GET Floor api
  getFloor() {
    this.bookSeatService.getFloor().subscribe((res: any) => {
      this.floor = res.data;
    })
  };


  // GET City api
  getCity() {
    this.bookSeatService.getCity().subscribe((res: any) => {
      this.city = res.data;
    })
  };

  // GET Seat configuration api
  getSeatView() {
    this.bookSeatService.getSeatViews(this.filterForm.value).subscribe((res: any) => {
      this.seatView = res.data;

      // count maximum seat of all the columns and assign numbers
      let counts = [0,0,0,0,0,0,0,0,0,0]

      this.seatView.forEach((seat: any) => {
        if(seat.column.name === 'A')
        {
          counts[0]++;
        }
        if(seat.column.name === 'B')
        {
          counts[1]++;
        }
        if(seat.column.name === 'C')
        {
          counts[2]++;
        }
        if(seat.column.name === 'D')
        {
          counts[3]++;
        }
        if(seat.column.name === 'E')
        {
          counts[4]++;
        }
        if(seat.column.name === 'F')
        {
          counts[5]++;
        }
        if(seat.column.name === 'G')
        {
          counts[6]++;
        }
        if(seat.column.name === 'H')
        {
          counts[7]++;
        }
        if(seat.column.name === 'I')
        {
          counts[8]++;
        }
        if(seat.column.name === 'J')
        {
          counts[9]++;
        }
      });
      this.seatCount = [];
      this.seatCnt = Math.max(...counts);

      // function to push 0 to max number of seats in array
      for (let index = 0; index < this.seatCnt; index++) {
        this.seatCount.push(index+1);        
      }  
    })
  }
}
