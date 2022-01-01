import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Noty } from '../shared/interface/noty';

@Injectable({
  providedIn: 'root'
})
export class NotificationEndpointService {

  CONNECTION_URL: string;

  constructor(private http: HttpClient) {
    this.CONNECTION_URL = "http://localhost:3000";
  }

  getNotifications(): Observable<Noty[]> {
    return this.http.get<Noty[]>(`${this.CONNECTION_URL}/notifications`);
  }

  createNotification(notification: Noty) {
    return this.http.post<Noty>(`${this.CONNECTION_URL}/notifications`, notification);
  }

  readNotification(notification: Noty): Observable<Noty> {
    return this.http.patch<Noty>(`${this.CONNECTION_URL}/notifications/${notification.uuid}`, notification);
  }

  readAllNotifications(notifications: Noty[]): Observable<Noty[]> {
    return forkJoin(notifications.map(notification => {
      notification.read = true;
      notification.new = false;
      return this.http.patch<Noty>(`${this.CONNECTION_URL}/notifications/${notification.uuid}`, notification);
    }));
  }

  updateNotification(notifications: Noty[]): void {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }

  deleteNotification(uuid: string): Observable<boolean> {
    let notifications: Noty[] = JSON.parse(localStorage.getItem("notifications") || '{}');
    notifications.forEach(notification => {
      if(notification.uuid == uuid) {
        notifications.splice(notifications.indexOf(notification), 1);
      }});
    localStorage.setItem("notifications", JSON.stringify(notifications));
    return of(true);
  }
}
