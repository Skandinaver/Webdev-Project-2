import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserForReg } from './../../_interfaces/user/UserForReg.model';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})

export class RegisterUserComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    });
  }

  public validateControl = (controlName: string) => {
    return this.registerForm.get(controlName)?.invalid && this.registerForm.get(controlName)?.touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.get(controlName)?.hasError(errorName)
  }

  public registerUser = (registerFormValue : any) => {
    const formValues = { ...registerFormValue };
    const user: UserForReg = {
      userName: formValues.username,
      password: formValues.password,
      confirmPassword: formValues.confirm
    };

    this.authService.registerUser("", user)
      .subscribe({
        next: (_) => console.log("Successful registration"),
        error: (err: HttpErrorResponse) => console.log(err.error.errors)
      })
  }
}
