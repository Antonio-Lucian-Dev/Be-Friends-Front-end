import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { mergeMap, Observable, of } from 'rxjs';
import { User } from '../components/interface/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() isUserLogged: EventEmitter<any> = new EventEmitter();
  @Output() isUserModified: EventEmitter<any> = new EventEmitter();

  CONNECTION_URL: string;

  constructor(private http: HttpClient) {
    this.CONNECTION_URL = "http://localhost:3000";
  }

  register(user: User): Observable<any> {
    localStorage.setItem('user', JSON.stringify(user));
    return this.http.post<User>(`${this.CONNECTION_URL}/users`, user);
  }

  editUser(user: User) {
    return this.http.patch<User>(`${this.CONNECTION_URL}/users/${user.id}`, user);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.CONNECTION_URL}/users/${userId}`)
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

  /*getUserById(userId: string): Observable<User | undefined> {
    let actualUser: User = {
      id: '',
      profileImage: '',
      firstName: '',
      lastName: '',
      birthday: '',
      email: '',
      password: '',
      createdAt: new Date(),
      bornLocation: '',
      liveLocation: ''
    };
    return this.http.get<User[]>(`${this.CONNECTION_URL}/users`).pipe(
      mergeMap(users => of(users.find(user => user.id == userId)))
    );
  } */

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.CONNECTION_URL}/users`);
  }
}
