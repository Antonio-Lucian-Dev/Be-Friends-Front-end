import { Observable, of } from 'rxjs';
import { Noty } from './../interface/noty';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  CONNECTION_URL: string;

  constructor(private http: HttpClient) {
    this.CONNECTION_URL = "http://localhost:3000";
  }

  saveNotification(notification: Noty) {
    return this.http.post<any>(`${this.CONNECTION_URL}/notifications`, notification);
  }

  getNotifications(userId: string): Observable<Noty[]> {
    const notificationResponse: Noty[] = [];
    this.http.get<Noty[]>(`${this.CONNECTION_URL}/notifications`).subscribe(notifications => {
      notifications.map(notification => {
        if(notification.userId === userId) {
          notificationResponse.push(notification);
        }
      });
    });
    return of(notificationResponse);
  }
}
