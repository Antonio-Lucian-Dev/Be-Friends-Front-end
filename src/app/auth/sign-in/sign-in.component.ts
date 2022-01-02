import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { User } from 'src/app/components/interface/User';
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
    if (this.userInfo.valid) {
      this.authService.login(this.userInfo.get("email")?.value, this.userInfo.get("password")?.value)
        .subscribe((users: User[]) => {
          const email = this.userInfo.get("email")?.value;
          const password = this.userInfo.get("password")?.value;
          const actualUser = users.find(user => (user.email == email && user.password == password));
          if (actualUser && actualUser.id) {
            localStorage.setItem('user', JSON.stringify(actualUser));
            this.authService.isUserLogged.emit(actualUser);
            this.router.navigate(['/home']);
          } else {
            this.errorMessage = "Credentials do not match.\n Please retry!"
          }
        });
    }
  }

}
