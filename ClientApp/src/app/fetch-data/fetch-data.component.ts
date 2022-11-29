import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UFO_sighting } from './../_interfaces/UFO_sighting/UFO_sighting.model'
import { UFORegisterService } from './../shared/services/uforegister.service';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public UFO_sightings: UFO_sighting[] = [];
  public isUserAuthenticated: boolean;

  ngOnInit(): void {
    this.authService.authChanged
      .subscribe(res => {
        this.isUserAuthenticated = res;
      })
  }

  public getUFOs = () => {
    this.ufoRegisterService.getUFOs().subscribe(result => {
      this.UFO_sightings = result;
    }, error => console.error(error));
  }

  constructor(private ufoRegisterService: UFORegisterService, private authService: AuthenticationService) {
    this.getUFOs();
    this.isUserAuthenticated = this.authService.isAuthorized;
  }
  public delete = (ID: any) => {
    this.ufoRegisterService.deleteUFO(ID).subscribe(result => {
      console.log(result);
      this.getUFOs();
    }, error => console.error(error));
  }

}



