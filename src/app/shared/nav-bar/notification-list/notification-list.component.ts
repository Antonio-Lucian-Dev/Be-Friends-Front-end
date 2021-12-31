import { Subscription } from 'rxjs';
import { AuthService } from './../../../auth/auth.service';
import { PostService } from './../../../services/post.service';

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
export class NotificationListComponent implements OnInit, AfterContentChecked {

  isOpen = false;
  @Input('notifications')
  notifications: Noty[] = [];

  @Input() userId: string = "";

  @Output()
  notificationSend = new EventEmitter<boolean>();

  numberofNotificationsNotRead = 0;

  postSubscription: Subscription | undefined;
  moment: any = moment;

  constructor(
    private readonly notificationService: NotificationEndpointService,
    private router: Router, private postService: PostService, private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getNotifications();
    this.postService.isPostCreated.subscribe(post => {
      this.authService.getAllUsers().subscribe(users => {
        let counter = 3000;
        users.forEach(user => {
          if (user.id != this.userId) {
            counter += counter;
            setTimeout(() => {
              const notyf = {
                uuid: Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
                read: false,
                new: true,
                prefData: {
                  date: new Date(),
                  type: "Like",
                  title: "Post Like",
                  description: `${user.firstName} just like your photo`,
                },
                userId: user.id,
                createdAt: new Date()
              };
              this.notifications.unshift(notyf);
              post.likes.push(user.id);

              // Create notification for each like for that post
              this.notifications.forEach(notification => {
                this.notificationService.createNotification(notification);
              });

              // Add like on the post
              this.postSubscription = this.postService.likeAPost(post).subscribe(response => {
                console.log(response);
                this.postService.postLiked.emit(post)
                this.numberofNotificationsNotRead++;
                this.postSubscription?.unsubscribe();
              });
            }, counter)
          }
        })
      });
    });
  }

  getNotifications() {
    this.notificationService.getNotifications().subscribe(notifications => {
      if (notifications && notifications.length > 0) {
        this.notifications = notifications;
        this.notifications.forEach(notification => {
          if (notification.read) {
            this.numberofNotificationsNotRead++;
          }
        })
      }
    });
  }

  ngAfterContentChecked() {
    this.countNotificationsNotRead();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    if (changes && changes['notifications']) {
      this.notifications = changes['notifications'].currentValue;
    }
  }

  private countNotificationsNotRead(): void {
    this.numberofNotificationsNotRead = _.filter(this.notifications, ['new', true]).length;
  }



  markNotificationAsRead(notificationId: string) {
    if (notificationId) {
      //notification.new = false;
      this.notificationService.readNotification(notificationId)
        .subscribe(notifications => this.notifications = notifications);
    }
  }

  markAllNotificationRead(): void {
    this.notificationService.readAllNotifications().subscribe(notifications => this.notifications = notifications);
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
