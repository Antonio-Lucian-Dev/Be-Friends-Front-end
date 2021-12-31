import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Noty } from '../shared/interface/noty';

@Injectable({
  providedIn: 'root'
})
export class NotificationEndpointService {

  CONNECTION_URL: string;

  constructor() {
    this.CONNECTION_URL = "http://localhost:3000";
  }

  getNotifications(): Observable<Noty[]> {
    return of(JSON.parse(localStorage.getItem("notifications") || '{}'));
  }

  readNotification(notificationId: string): Observable<Noty[]> {
    const notifications: Noty[] = JSON.parse(localStorage.getItem("notifications") || '{}');
    notifications.map(notification => {
      if(notification.uuid == notificationId) {
        notification.read = true;
        notification.new = false;
        return;
      }
    });
    this.updateNotification(notifications);
    return of(JSON.parse(localStorage.getItem("notifications") || '{}'));
  }

  readAllNotifications(): Observable<Noty[]> {
    const notifications: Noty[] = JSON.parse(localStorage.getItem("notifications") || '{}');
    const modifiedNotifications = notifications.map(notification => {
      notification.read = true;
      notification.new = false;
      return notification;
    });
    this.updateNotification(modifiedNotifications);
    return of(JSON.parse(localStorage.getItem("notifications") || '{}'));
  }

  createNotification(notification: Noty) {
    let notifications: Noty[] = JSON.parse(localStorage.getItem("notifications") || '{}');
    if(!notifications.length) {
      notifications = [];
    }
    notifications.push(notification);

    localStorage.setItem("notifications", JSON.stringify(notifications));
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
