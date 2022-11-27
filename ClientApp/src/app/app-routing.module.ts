import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loginComponent } from './login/login.component';
import { mapsComponent } from './maps/maps.component';
import { reportComponent } from './report/report.component';
 
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },

  { path: 'login', component: loginComponent },
  { path: 'maps', component: mapsComponent },
  { path: 'report', component: reportComponent },
 
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,
      { relativeLinkResolution: 'legacy' }),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
