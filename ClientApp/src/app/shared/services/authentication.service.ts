import { UserForReg } from './../../_interfaces/user/UserForReg.model';
import { RegResponse } from './../../_interfaces/response/RegResponse.model';
import { UserForAuth } from './../../_interfaces/user/UserForAuth.model';
import { AuthResponse } from './../../_interfaces/response/AuthResponse.model'
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //This observable notifies all subscribed components that Auth state is changed
  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
  public registerUser = (route: string, body: UserForReg) => {
    return this.http.post<RegResponse>(this.createCompleteRoute(route, this.baseUrl + 'api/Account/register'), body);
  }
  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  public loginUser = (route: string, body: UserForAuth) => {
    return this.http.post<AuthResponse>(this.createCompleteRoute(route, this.baseUrl + 'api/Account/login'), body);
  }
}
