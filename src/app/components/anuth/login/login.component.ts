import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() ngClose = new EventEmitter<Boolean>();
  @Output() ngLoginStatus = new EventEmitter<any>();
  @Output() ngRestartPassword = new EventEmitter<Boolean>();

  user: User;
  isSpiner: Boolean;
  constructor(private router: Router,
    private loginService: LoginService
  ) {
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
    this.loginService.login(this.user)
      .subscribe(res => {

        if (res['message'] !== 'SUCCESS') {
          this.ngLoginStatus.emit({status: false, message: res['message']});
          this.isSpiner = false;
        } else {
          this.ngLoginStatus.emit({status: true, message: res['message']});
          this.router.navigate(['/home'])
          this.isSpiner = false;
        }

      }, err => {
        this.ngLoginStatus.emit({status: false, message: 'ERROR_SERVER_NOT_FOUND'});
        this.user = new User();
        this.isSpiner = false;
      })
  }

  ngOpenRestartPassword() {
    this.ngRestartPassword.emit(true);
  }
}
