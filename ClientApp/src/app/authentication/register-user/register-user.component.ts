import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserForReg } from './../../_interfaces/user/UserForReg.model';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { PasswordConfirmationValidatorService } from './../../shared/custom-validators/password-confirmation-validator.service'
import { ErrorHandlerService } from './../../shared/services/error-handler.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})

export class RegisterUserComponent implements OnInit {

  registerForm!: FormGroup;
  public errorMessage: string = '';
  public showError?: boolean;

  constructor(private authService: AuthenticationService, private passConfValidator: PasswordConfirmationValidatorService, private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    });
    this.registerForm.get('confirm')?.setValidators([Validators.required,
    this.passConfValidator.validateConfirmPassword(this.registerForm.get('password')!)])
  }

  public validateControl = (controlName: string) => {
    return this.registerForm.get(controlName)?.invalid && this.registerForm.get(controlName)?.touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.get(controlName)?.hasError(errorName)
  }

  public registerUser = (registerFormValue: any) => {
    this.showError = false;
    const formValues = { ...registerFormValue };
    const user: UserForReg = {
      userName: formValues.username,
      password: formValues.password,
      confirmPassword: formValues.confirm
    };

    this.authService.registerUser("", user)
      .subscribe({
        next: (_) => this.router.navigate(['/authentication/login']),
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.message;
          this.showError = true;
        }
      })
  }
}
