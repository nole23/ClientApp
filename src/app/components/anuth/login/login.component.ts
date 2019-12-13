import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() ngClose = new EventEmitter<Boolean>();
  @Output() ngLoginStatus = new EventEmitter<Boolean>();
  @Output() ngEerrorStatus = new EventEmitter<Boolean>();
  @Output() ngStatusProfile = new EventEmitter<Boolean>();
  @Output() ngNotActivete = new EventEmitter<Boolean>();
  @Output() ngRestartPassword = new EventEmitter<Boolean>();

  user: User;
  isSpiner: Boolean;
  constructor(private userService: UserService, private router: Router) {
    this.user = new User();
    this.isSpiner = false;
  }

  ngOnInit() {
  }

  ngRegistration() {
    this.ngClose.emit(false);
  }

  ngLogin() {
    this.isSpiner = true;
    this.userService.login(this.user)
    .subscribe(res => {
      this.ngLoginStatus.emit(true);
      this.router.navigate(['/home'])
      this.isSpiner = false;
    }, err => {
      if (err['status'] === 401) {
        this.ngStatusProfile.emit(true);
      } else if (err['status'] === 404) {
        this.ngEerrorStatus.emit(true);
      } else if (err['status'] === 403) {
        this.ngNotActivete.emit(true);
      } else if (err['status'] === 400) {
        this.ngEerrorStatus.emit(true)
      }
      this.isSpiner = false;
      this.user = new User();
    })
  }

  ngOpenRestartPassword() {
    this.ngRestartPassword.emit(true);
  }
}
