
import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { NotificationEndpointService } from 'src/app/services/notification-endpoint.service';
import { Noty } from '../../interface/noty';


@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit, AfterContentChecked{

  isOpen = false;
  @Input('notifications')
  notifications: Noty[] = [
    {
      uuid: "34534",
      read: false,
      new: true,
      prefData: {
        date: "12-03-22",
        type: "Like",
        title: "Post Like",
        description: "Mark just like your photo",
      },
      userId: "5",
      createdAt: new Date()
    }
  ];

  @Output()
  notificationSend = new EventEmitter<boolean>();

  numberofNotificationsNotRead = 0;


  moment: any = moment;

  constructor(private readonly notificationService: NotificationEndpointService, private router: Router) { }

  ngOnInit(): void { }

  ngAfterContentChecked() {
    this.countNotificationsNotRead();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.notifications = changes['notifications'].currentValue;
  }

  private countNotificationsNotRead(): void {
    this.numberofNotificationsNotRead = _.filter(this.notifications, ['new', true]).length;
  }



  markNotificationAsRead(notification: Noty) {
    if (notification.new) {
      notification.new = false;
      this.notificationService.readNotification(notification.uuid)
        .subscribe(res => this.notificationSend.emit(true));
    }
  }

  markAllNotificationRead(): void {
    this.notifications.forEach((notification: Noty) => {
      this.markNotificationAsRead(notification);
    })
  }

  deleteNotification(uuid: string) {
    this.notificationService.deleteNotification(uuid).subscribe(res => this.notificationSend.emit(true));
  }

  /* navigateTo(notification: Noty) {
     this.markNotificationAsRead(notification);
     this.router.navigate(['/requests-management/open-request', { 'uuid': notification.requestUuid, 'requestId': notification.requestId, 'breadcrumb': notification.requestId }]);
     this.isOpen = false;
   } */


}
