import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { Global } from '../../global/global';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() status = new EventEmitter<Boolean>();

  addCals: String;
  user: User;
  opening: String;
  href: String;
  onStatus: any;
  state: any;
  isNotification: Boolean;
  isChat: Boolean;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private location: Location,
    private global: Global
  ) {
    this.addCals = '';
    this.user = new User(JSON.parse(localStorage.getItem('user')));
    this.opening = 'chat';
    this.onStatus = {
      isProfile: false,
      isChat: false,
      isSearch: false,
      isNotification: false,
      isSettings: false
    };
    this.global.sidebarComponent$.subscribe(res => {
      this.getStatusLink();
    });
    this.global.sidebarComponentRemove$.subscribe(res => {
      this.removeNotification(res);
    });
    this.global.testComponent$.subscribe(res => {
      this.serviceCall()
    })
    this.state = null;
    this.isNotification = true;
    this.isChat = false;
  }

  ngOnInit() {
    this.setNotification(JSON.parse(localStorage.getItem('notification')));
  }

  getStatusLink() {
    let href = this.location.path().split('/')[1];
    if (href.toString() === this.user.username.toString()) {
      this.onStatus = {
        isProfile: true,
        isChat: false,
        isSearch: false,
        isNotification: false,
        isSettings: false
      };
    } else if (href.toString() === 'f') {
      this.onStatus = {
        isProfile: true,
        isChat: false,
        isSearch: false,
        isNotification: false,
        isSettings: false
      };
    } else if (href.toString() === 'chat') {
      this.onStatus = {
        isProfile: false,
        isChat: true,
        isSearch: false,
        isNotification: false,
        isSettings: false
      };
    } else if (href.toString() === 'search') {
      this.onStatus = {
        isProfile: false,
        isChat: false,
        isSearch: true,
        isNotification: false,
        isSettings: false
      };
    } else if (href.toString() === 'notification') {
      this.onStatus = {
        isProfile: false,
        isChat: false,
        isSearch: false,
        isNotification: true,
        isSettings: false
      };
    } else if (href.toString() === 'settings') {
      this.onStatus = {
        isProfile: false,
        isChat: false,
        isSearch: false,
        isNotification: false,
        isSettings: true
      };
    }
  }

  setNotification(item: any) {
    let i = item.notification.isNotificaton;
    i = i + item.notification.isVisitor;
    i = i + item.relationship;

    if (i > 0) {
      this.isNotification = true;
    } else {
      this.isNotification = false;
    }
  }

  serviceCall() {
    let item = this.global.getNumberOfMessage()
    if (item.length > 0) {
      this.isChat = true;
    } else if (item.length === 0) {
      this.isChat = false;
    }
  }

  removeNotification(isStatys: Boolean) {
    if (isStatys) {
      this.setNotification(JSON.parse(localStorage.getItem('notification')))
    }
  }

  ngOpenSideBar() {
    if (this.addCals === '') {
      this.addCals = 'showSidebar';
    } else {
      this.addCals = ''
    }
  }

  ngLogout() {
    this.loginService.logout();
    this.status.emit();
  }

  activeRouter() {
    this.getStatusLink();
  }
}
