import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UFO_sighting } from './../_interfaces/UFO_sighting/UFO_sighting.model'

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public UFO_sightings: UFO_sighting[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<UFO_sighting[]>(baseUrl + 'api/ufo_sighting').subscribe(result => {
      this.UFO_sightings = result;
    }, error => console.error(error));
  }
}



