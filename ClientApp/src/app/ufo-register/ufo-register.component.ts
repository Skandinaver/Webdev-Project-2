import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UFORegisterService } from './../shared/services/uforegister.service';
import { UFO_sighting } from './../_interfaces/UFO_sighting/UFO_sighting.model';
import { Category } from './../_interfaces/category/Category.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

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
  public ufo_to_edit?: UFO_sighting;
  public editing = false;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private uforegisterservice: UFORegisterService, private router: Router, private actRoute: ActivatedRoute) {
    http.get<Category[]>(baseUrl + 'api/categories').subscribe(result => {
      this.categories = result;
    }, error => console.error(error));
  }

  public fetchAndPopulateForm = (id: number) => {
    this.uforegisterservice.getUFO(id).subscribe(result => {
      this.ufo_to_edit = result;
      console.log(result)
      this.UFOForm.setValue({
        'ufO_title': this.ufo_to_edit?.ufO_title,
        'categoryid': this.ufo_to_edit?.categoryID,
        'longitude': this.ufo_to_edit?.longitude,
        'latitude': this.ufo_to_edit?.latitude,
        'observation_date': formatDate(this.ufo_to_edit?.observation_date, "yyyy-MM-dd", "en-us"),
        'description': this.ufo_to_edit?.description,
      });
      this.editing = true;
      
    }, error => console.error(error))
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

    if (this.actRoute.snapshot.params['id'] != undefined) {
      this.fetchAndPopulateForm(this.actRoute.snapshot.params['id']);
    }
   
  }

  public uforegister = (UFOFormValue: any) => {
    const formValues = { ...UFOFormValue };
    const ufo: UFO_sighting = {
      id: undefined,
      ufO_title: formValues.ufO_title,
      category: undefined,
      categoryID: formValues.categoryid,
      longitude: formValues.longitude,
      latitude: formValues.latitude,
      observation_date: formValues.observation_date,
      description: formValues.description
    };

    if (this.editing) {
      ufo.id = this.ufo_to_edit?.id
      this.uforegisterservice.updateUFO(this.ufo_to_edit?.id!, ufo)
        .subscribe({
          next: (_) => this.router.navigate(['/fetch-data']),
          error: (err: HttpErrorResponse) => {
            this.errorMessage = err.message;
            this.showError = true;
          }
        })
    } else {
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
}
