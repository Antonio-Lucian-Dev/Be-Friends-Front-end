import { User } from './../components/interface/User';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeFriendsGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let userResponse = null;
      this.authService.getUserFromLocal().subscribe(user => userResponse = user);
    if(userResponse != null && userResponse["id"]) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
     return false;
    }
  }

}
