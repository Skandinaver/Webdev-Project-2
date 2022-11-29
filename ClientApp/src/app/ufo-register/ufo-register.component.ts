import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UFORegisterService } from './../shared/services/uforegister.service';
import { UFO_sighting } from './../_interfaces/UFO_sighting/UFO_sighting.model';
import { Category } from './../_interfaces/category/Category.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ufo-register',
  templateUrl: './ufo-register.component.html',
  styleUrls: ['./ufo-register.component.css']
})

export class UFORegisterComponent implements OnInit {

  UFOForm!: FormGroup;
  public errorMessage: string = '';
  public showError?: boolean;
  public categories: Category[] = [];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private uforegisterservice: UFORegisterService, private router: Router) {
    http.get<Category[]>(baseUrl + 'api/categories').subscribe(result => {
      this.categories = result;
    }, error => console.error(error));
  }

  ngOnInit(): void {
    this.UFOForm = new FormGroup({

      ufO_title: new FormControl(''),
      categoryid: new FormControl(''),
      longitude: new FormControl(''),
      latitude: new FormControl(''),
      observation_date: new FormControl(''),
      description: new FormControl(''),
    });

   
  }

  public uforegister = (UFOFormValue: any) => {
    const formValues = { ...UFOFormValue };
    const ufo: UFO_sighting = {
      id: undefined,
      ufO_title: formValues.ufO_title,
      category: undefined,
      categoryid: formValues.categoryid,
      longitude: formValues.longitude,
      latitude: formValues.latitude,
      observation_date: formValues.observation_date,
      description: formValues.description
    };

    this.uforegisterservice.registerUFO("", ufo)
      .subscribe({
        next: (_) => this.router.navigate(['/fetch-data']),
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.message;
          this.showError = true;
        }
      })
  }
}
