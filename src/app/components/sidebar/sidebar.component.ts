import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
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
  constructor(private userService: UserService) {
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
    this.userService.logout().subscribe(res => {
      console.log(res)
      this.status.emit();
    })
  }
}
