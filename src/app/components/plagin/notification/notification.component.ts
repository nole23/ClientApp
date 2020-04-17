import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications: any;
  me: any;
  constructor(
    private notificationService: NotificationService
  ) {
    this.me = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.getAllNotification();
  }

  getAllNotification() {
    this.notificationService.getAllNotification().subscribe(res => {
      this.notifications = res['message'];
    });
  }
}
