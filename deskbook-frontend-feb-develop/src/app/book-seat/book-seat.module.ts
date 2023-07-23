import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookSeatRoutingModule } from './book-seat-routing.module';
import { BookSeatComponent } from './book-seat/book-seat.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BookSeatService } from './service/book-seat.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    BookSeatComponent
  ],
  imports: [
    CommonModule,
    BookSeatRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers:[
    BookSeatService
  ]
})
export class BookSeatModule { }
