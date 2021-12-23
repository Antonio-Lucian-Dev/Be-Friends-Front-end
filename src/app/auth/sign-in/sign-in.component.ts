import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  errorMessage = "";

  userInfo = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

   // convenience getter for easy access to form fields
   get userInfoControls() { return this.userInfo.controls; }

   onSubmit(): void {
    if(this.userInfo.valid) {
      const response = this.authService.login(this.userInfo.get("email")?.value, this.userInfo.get("password")?.value);
      if(response) {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = "Credentials do not match.\n Please retry!"
      }
    }
  }

}
