import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Global } from '../../global/global';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  notifications: any;
  visitors: any;
  me: any;
  title: String;
  page: any;
  constructor(
    private notificationService: NotificationService,
    private global: Global
  ) {
    this.me = JSON.parse(localStorage.getItem('user'));
    this.title = 'Posjetioci';
    this.notifications = null;
    this.visitors = null;
    this.page = 0;
  }

  ngOnInit() {
    // this.getAllNotification();
    this.getAllVisitors()
    this.global.setSidebar('notiification');
  }

  getAllNotification() {
    this.notificationService.getAllNotification(this.page).subscribe(res => {
      this.notifications = res['message'];
    });
  }

  getAllVisitors() {
    this.notificationService.getAllVisitors(this.page).subscribe(res => {
      this.visitors = res['message'];
    });
  }

  openTab(type: String) {
    if (type === 'notification') {
      this.title = 'Obavjestenja';
      if (this.notifications === null) {
        this.getAllNotification();
      }
    } else if (type === 'visitor') {
      this.title = 'Posjetioci';
      if (this,this.visitors === null) {
        this.getAllVisitors();
      }
    }
  }

  ngOnDestroy() {
  }
}
