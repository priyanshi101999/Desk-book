import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserProfileService {
  url = environment.java_url;
  constructor(private http: HttpClient) {}

  getFlag(){
    return this.http.get(this.url + "api/deskbook/user-profile/is-updated");
  }

  getDesignation() {
    return this.http.get(this.url + "api/deskbook/designations");
  }

  getModeOfWork() {
    return this.http.get(this.url + "api/deskbook/mode-of-works");
  }

  getDays() {
    return this.http.get(this.url + "api/deskbook/working-days");
  }

  getCity() {
    return this.http.get(this.url + "api/deskbook/cities");
  }

  getFloor(cityId: any) {
    return this.http.get(this.url + "api/deskbook/floors/" + cityId);
  }

  getColumn(floorId: any) {
    return this.http.get(this.url + "api/deskbook/columns/" + floorId);
  }

  getSeat(columnId: any) {
    return this.http.get(this.url + "api/deskbook/seats/" + columnId);
  }
  postData(data: any) {

    return this.http.put(this.url + 'api/deskbook/user-profile/', data);
  }

  getAllData() {
    return this.http.get(this.url + 'api/deskbook/user-profile/');
  }

  //  API Integration of complete user profile view.
  getUserProfileView() {
      return this.http.get(this.url + 'api/deskbook/user-profile/');
  }
}
