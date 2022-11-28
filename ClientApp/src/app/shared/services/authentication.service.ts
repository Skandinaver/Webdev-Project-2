import { UserForReg } from './../../_interfaces/user/UserForReg.model';
import { RegResponse } from './../../_interfaces/response/RegResponse.model';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
  public registerUser = (route: string, body: UserForReg) => {
    return this.http.post<RegResponse>(this.createCompleteRoute(route, this.baseUrl + 'api/Account/register'), body);
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}
