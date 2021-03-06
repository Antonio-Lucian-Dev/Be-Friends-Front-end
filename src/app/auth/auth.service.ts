import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map, mergeMap, Observable, of } from 'rxjs';
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
    return this.http.post<User>(`${this.CONNECTION_URL}/users`, user);
  }

  login(email: string, password: string): Observable<User[]> {
    // Trebuie sa vad prin db json ca sa mearga loginul
    return this.http.get<User[]>(`${this.CONNECTION_URL}/users`);
  }

  logOut(): Observable<boolean> {
    localStorage.removeItem('user');
    return of(true);
  }

  editUser(user: User): Observable<any> {
    return this.http.patch<User>(`${this.CONNECTION_URL}/users/${user.id}`, user);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.CONNECTION_URL}/users/${userId}`)
  }

  getUserFromLocal(): Observable<User> {
    return of(JSON.parse(localStorage.getItem('user') || '{}'));
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.CONNECTION_URL}/users`);
  }
}
