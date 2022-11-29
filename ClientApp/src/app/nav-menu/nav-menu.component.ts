import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../shared/services/authentication.service';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent implements OnInit {
  isExpanded = false;

  public isUserAuthenticated: boolean;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.isUserAuthenticated = this.authService.isAuthorized;
  }

  ngOnInit(): void {
    this.authService.authChanged
      .subscribe(res => {
        this.isUserAuthenticated = res;
      })
  }

  public logout = () => {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
