import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
  pageNoti: any;
  pageVisit: any;
  isNewNoti: Boolean;
  constructor(
    private notificationService: NotificationService,
    private global: Global
  ) {
    this.me = JSON.parse(localStorage.getItem('user'));
    this.title = 'Obavjestenja';
    this.notifications = null;
    this.visitors = null;
    this.pageNoti = 0;
    this.pageVisit = 0;
    this.isNewNoti = true;
  }

  ngOnInit() {
    this.getAllNotification();
    this.global.setSidebar('notiification');
  }

  getAllNotification() {
    this.notificationService.getAllNotification(this.pageNoti).subscribe(res => {
      this.notifications = res['message'];
      this.pageNoti = this.pageNoti + 1;
    });
  }

  getAllVisitors() {
    this.notificationService.getAllVisitors(this.pageVisit).subscribe(res => {
      this.visitors = res['message'];
      this.pageVisit = this.pageVisit + 1;
    });
  }

  openTab(type: String) {
    this.isNewNoti = true;
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

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= (event.target.scrollHeight - 500)) {
      if (this.isNewNoti) {
        if (this.title === 'Obavjestenja') {
          this.isNewNoti = false;
          this.notificationService.getAllNotification(this.pageNoti).subscribe(res => {
            if (res['message'].length !== 0) {
              res['message'].forEach(element => {
                this.notifications.push(element)
              });
              this.pageNoti = this.pageNoti + 1;
              this.isNewNoti = true;
            }
          });
        } else if (this.title === 'Posjetioci') {
          this.isNewNoti = false;
          this.notificationService.getAllVisitors(this.pageVisit).subscribe(res => {
            if (res['message'].length !== 0) {
              res['message'].forEach(element => {
                this.visitors.push(element)
              });
              this.pageVisit = this.pageNoti + 1;
              this.isNewNoti = true;
            }
          });
        }
        
      }
    }
  }

  ngOnDestroy() {
  }
}
