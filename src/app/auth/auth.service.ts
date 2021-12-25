import { User } from './../components/interface/User';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../components/interface/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() isUserLogged: EventEmitter<any> = new EventEmitter();

  CONNECTION_URL: string;

  constructor(private http: HttpClient) {
    this.CONNECTION_URL = "http://localhost:3000";
   }

  register(user: User): boolean {
    this.http.post<User>(`${this.CONNECTION_URL}/posts`, user);
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

  getUserById(userId: string): Observable<User> {
    let actualUser: User;
    this.http.get<User[]>(`${this.CONNECTION_URL}/users`).subscribe((users: User[]) => {
       users.forEach(user => {
         if(user.id == userId) {
           actualUser = user;
         }
       });
    });
    return of(actualUser);
  }
}
