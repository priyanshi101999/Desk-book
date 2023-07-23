import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url:string;
  constructor(private http: HttpClient) { 
    this.url = environment.java_url;
  }

  getFlag(){     
    return this.http.get(this.url + "api/deskbook/user-profile/is-updated");
  }
}
