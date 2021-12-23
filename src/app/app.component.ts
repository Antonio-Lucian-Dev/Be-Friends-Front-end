import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'be-friends';

  isLoading = false;

  constructor(private authService: AuthService) {
    this.authService.isUserLogged.subscribe(() => {
      this.isLoading = true;
      setTimeout(() => {this.isLoading = false}, 5000);
    })
  }
}
