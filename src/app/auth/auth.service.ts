import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../components/interface/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() isUserLogged: EventEmitter<any> = new EventEmitter();

  constructor() { }

  register(user: User): boolean {
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }

  login(email: string, password: string): Observable<User> {
    const user: User = JSON.parse(localStorage.getItem('user') || '{}');
    const userNull: User = {
      id: '',
      profileImage: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthday: '',
      createdAt: new Date(),
      bornLocation: '',
      liveLocation: ''
    };
    if (user && user.email == email && user.password == password) {
      this.isUserLogged.emit(true);
      return this.getUser();
    } else {
      return of(userNull);
    }
  }

  getUser(): Observable<User> {
    return of(JSON.parse(localStorage.getItem('user') || '{}'));
  }
}
