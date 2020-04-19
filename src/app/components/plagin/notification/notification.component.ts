import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { Global } from '../../../global/global';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications: any;
  me: any;
  constructor(
    private notificationService: NotificationService,
    private global: Global
  ) {
    this.me = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.getAllNotification();
    this.global.setSidebar('notiification');
  }

  getAllNotification() {
    this.notificationService.getAllNotification().subscribe(res => {
      this.notifications = res['message'];
    });
  }
}
