import { UFO_sighting } from './../../_interfaces/UFO_sighting/UFO_sighting.model';
import { RegResponse } from './../../_interfaces/response/RegResponse.model'
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UFORegisterService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
  public registerUFO = (route: string, body: UFO_sighting) => {
    return this.http.post<RegResponse>(this.createCompleteRoute(route, this.baseUrl + 'api/UFO_sighting'), body);
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}
