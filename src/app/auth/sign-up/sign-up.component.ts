import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  submitted = false;

  userInfo = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    birthday: ["", Validators.required],
    password: ["", Validators.required],
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  // convenience getter for easy access to form fields
  get userInfoControls() { return this.userInfo.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.userInfo.valid) {
      const request = {
        id: Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
        profileImage: "./assets/img/no-image.png",
        firstName: this.userInfo.get('firstName')?.value,
        lastName: this.userInfo.get('lastName')?.value,
        email: this.userInfo.get('email')?.value,
        birthday: this.userInfo.get('birthday')?.value,
        password: this.userInfo.get('password')?.value,
        createdAt: new Date(),
        bornLocation: "",
        liveLocation: ""
      }
      const response = this.authService.register(request).subscribe(response => {
        this.toastr.success('Registration Complete', 'Please login with your credential!');
        this.router.navigate(['/sign-in']);
      });
    }
  }

}
