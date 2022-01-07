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
    localStorage.removeItem('notifications');
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
        liveLocation: "",
        follower: [
          '1',
          '2'
        ],
        followed: [
          '1',
          '2'
        ]
      }
      this.authService.register(request).subscribe(response => {
        this.authService.getUserById('1').subscribe(user => {
          user.follower.push(response.id);
          user.followed.push(response.id);
          this.authService.editUser(user).subscribe();
        });
        this.authService.getUserById('2').subscribe(user => {
          user.follower.push(response.id);
          user.followed.push(response.id);
          this.authService.editUser(user).subscribe();
          this.toastr.success('Registration Complete', 'Please login with your credential!');
          this.router.navigate(['/sign-in']);
        });
      });
    }
  }

}
