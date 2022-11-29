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
  public deleteUFO = (route: string) => {
    return this.http.delete<RegResponse>(this.createCompleteRoute(route, this.baseUrl + 'api/UFO_sighting'));
  }
  public getUFOs = () => {
    return this.http.get<UFO_sighting[]>(this.baseUrl + 'api/UFO_sighting')
  }
  public getUFO = (id: number) => {
    return this.http.get<UFO_sighting>(this.createCompleteRoute(id.toString(), this.baseUrl + 'api/UFO_sighting'))
  }
  public updateUFO = (id: number, body: UFO_sighting) => {
    return this.http.put<UFO_sighting>(this.createCompleteRoute(id.toString(), this.baseUrl + 'api/UFO_sighting'), body)
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

}
