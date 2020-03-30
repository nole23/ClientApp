import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  constructor(private loginService: LoginService) {
    this.addCals = '';
    this.user = new User();
  }

  ngOnInit() {
    this.user = new User(JSON.parse(localStorage.getItem('user')));
  }

  ngOpenSideBar() {
    if (this.addCals === '') {
      this.addCals = 'active';
    } else {
      this.addCals = ''
    }
  }

  ngLogout() {
    this.loginService.logout();
    this.status.emit();
  }
}
