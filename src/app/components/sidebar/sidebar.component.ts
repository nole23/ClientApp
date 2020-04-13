import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';

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
  constructor(
    private router: Router,
    private loginService: LoginService,
    private location: Location
  ) {
    this.addCals = '';
    this.user = new User();
    this.opening = 'chat'
  }

  ngOnInit() {
    this.user = new User(JSON.parse(localStorage.getItem('user')));
    this.href = this.location.path().split('/')[1];
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
    this.href = this.location.path().split('/')[1];
  }
}
