import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

interface Category {
  id: number;
  category_name: string;
}
interface UFO_sighting {
  id: number;
  categoryid: number;
  category: Category;
  ufO_title: string;
  longitude: number;
  latitude: number;
  observation_date: Date;
  description: string;
}
