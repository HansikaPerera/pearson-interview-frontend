import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "/rest/v2";

  constructor(private httpClient: HttpClient) {

  }

  public getAllCountries() {

    return this.httpClient.get(`${this.REST_API_SERVER}/country`);
  }

  public deleteCountry(countryId) {

    this.httpClient.delete(`${this.REST_API_SERVER}/country/${countryId}`).subscribe(data => {
      console.log(data);
    });
  }

}
