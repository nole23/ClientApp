import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Global } from '../../global/global';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  private readonly notifier: NotifierService;

  notifications: any;
  visitors: any;
  relationship: any;
  me: any;
  title: String;
  pageNoti: any;
  pageVisit: any;
  pageRelationship: any;
  isNewNoti: Boolean;
  numberOfNotification: any;
  numberOfVisitor: any;
  numberOfRequest: any;
  constructor(
    private notificationService: NotificationService,
    private global: Global,
    notifier: NotifierService
  ) {
    this.me = JSON.parse(localStorage.getItem('user'));
    this.notifier = notifier;
    this.title = 'Obavjestenja';
    this.notifications = null;
    this.visitors = null;
    this.relationship = null;
    this.pageNoti = 0;
    this.pageVisit = 0;
    this.pageRelationship = 0;
    this.isNewNoti = true;
    this.numberOfNotification = 0;
    this.numberOfVisitor = 0;
    this.numberOfRequest = 0;
    this.global.sidebarComponentRemove$.subscribe(res => {
      this.setNotification()
    });
  }

  ngOnInit() {
    this.getAllNotification();
    this.setNotification();
    this.global.setSidebar('notiification');
  }

  getAllNotification() {
    this.notificationService.getAllNotification(this.pageNoti).subscribe(res => {
      this.notifications = res['message'];
      this.pageNoti = this.pageNoti + 1;

      setTimeout(() => {
        this.setShowNotification('publication');
      },1000);
    });
  }

  setNotification() {
    let item = JSON.parse(localStorage.getItem('notification'))
    this.numberOfNotification = item.notification.isNotificaton;
    this.numberOfVisitor = item.notification.isVisitor;
    this.numberOfRequest = item.relationship;
  }

  getAllVisitors() {
    this.notificationService.getAllVisitors(this.pageVisit).subscribe(res => {
      this.visitors = res['message'];
      this.pageVisit = this.pageVisit + 1;

      setTimeout(() => {
        this.setShowNotification('visitors');
      },1000);
    });
  }

  getAllRelationship() {
    this.notificationService.getAllRelationship(this.pageRelationship).subscribe(res => {
      if (res['message'].length === 0) {
        this.relationship = [];
      } else {
        this.relationship = res['message']
        this.pageRelationship = this.pageRelationship + 1;
      }
    })
  }

  openTab(type: String) {
    this.isNewNoti = true;
    if (type === 'notification') {
      this.title = 'Obavjestenja';
      if (this.notifications === null) {
        this.getAllNotification();
      }
      this.global.editViewNotification('publication');
    } else if (type === 'visitor') {
      this.title = 'Posjetioci';
      if (this.visitors === null) {
        this.getAllVisitors();
      }
      this.global.editViewNotification('visitors');
    } else if (type === 'Request') {
      this.title = 'Zahtevi za prijateljstvo';
      if (this.relationship === null) {
        this.getAllRelationship();
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

  setShowNotification(type: String) {
    if (this.notifications !== null || this.visitors !== null) {
      this.notificationService.setShowNotification(type).subscribe(res =>{
        if (type === 'publication') {
          this.notifications.forEach(element => {
            element.isStatus = true;
          });
        } else if (type === 'visitors') {
          this.visitors.forEach(element => {
            element.isStatus = true;
          });
        }
      })
    }
  }

  onEmitRelationship(event: any) {
    if (event.type === 'accept') {
      if (event.status) {
        if (this.relationship.length > 1) {
          let index = this.relationship.indexOf(event.item);
          this.relationship.splice(index, 1);
          this.numberOfRequest = this.relationship.length;
        }
      } else {
        this.notifier.notify('warning', 'Server nije dostupan, osvezite stranicu pa pokusajte ponovo')
      }
    } else if (event.type === 'remove') {
      if (event.status) {
        let index = this.relationship.indexOf(event.item);
        this.relationship.splice(index, 1);
        this.numberOfRequest = this.relationship.length;
      } else {
        this.notifier.notify('warning', 'Server nije dostupan, osvezite stranicu pa pokusajte ponovo')
      }
    }
  }

  ngOnDestroy() {
    this.title = 'Obavjestenja';
    this.notifications = null;
    this.visitors = null;
    this.relationship = null;
    this.pageNoti = 0;
    this.pageVisit = 0;
    this.pageRelationship = 0;
    this.isNewNoti = true;
    this.numberOfNotification = 0;
    this.numberOfVisitor = 0;
    this.numberOfRequest = 0;
  }
}
