import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  user: boolean = false;

  constructor(
    private userService: UserAuthService,
    private router: Router,
    private sweetAlertService: SweetAlertService
  ) {}

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });

  ngOnInit(): void {
    this.user = this.userService.UserState;
  }

  userLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
  
      if (email === 'marina@gmail.com' && password === '1234') {
        this.userService.login(email, password).subscribe(
          (response) => {
            if (response) {
              this.router.navigate(['/dashboard']);
              console.log('Login successful');
            } else {
              this.sweetAlertService.showError('Invalid Mail or Password');
            }
          },
          (error: HttpErrorResponse) => {
            this.sweetAlertService.showError('Invalid Mail or Password');
          }
        );
      } else {
        this.sweetAlertService.showError('Invalid Mail or Password');
      }
    }
  }
}