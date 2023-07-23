import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookSeatService {

  cityId: any;
  newDate: any;
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.java_url;
  }

  // API to get city
  getCity() {
    return this.httpClient.get(this.url + 'api/deskbook/cities');
  }

  // API to get Floor
  getFloor() {
    return this.httpClient.get(this.url + 'api/deskbook/floors/' + this.cityId);
  }

  // API to get Seat Data 
  getSeatViews(seatValues: any){
    return this.httpClient.get(this.url + 'api/deskbook/seat-view?date=' + this.newDate + '&cityId=' + seatValues.city + '&floorId=' + seatValues.floor);
  }

  // Selected value of City in Book seat filter
  selectedCity(val : any){
    this.cityId = val.id;
  }

  // Selected value of Date in Book seat filter
  dateChange(val : string){
    this.newDate = val;
  }

}
