import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isUserLogged = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // TODO: verify if the user is logged, otherwise show the login btn
  }

  login() {
    this.router.navigate(['/sign-in']);
  }

  register() {
    this.router.navigate(['/sign-up']);
  }

}
