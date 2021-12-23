import { Injectable } from '@angular/core';
import { User } from '../components/interface/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  register(user: User): boolean {
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }

  login(email: string, password: string): User | boolean {
    const user: User = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.email == email && user.password == password) {
      return user;
    } else {
      return false;
    }
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
