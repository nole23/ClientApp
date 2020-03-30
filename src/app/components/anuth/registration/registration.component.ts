import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../../../models/user';
import { UserInformation } from '../../../models/user-information';
import { UserService } from '../../../services/user.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @Output() ngClose = new EventEmitter<any>();

  user: User;
  userInformation: UserInformation;
  worningRegistrationStatus: Boolean;
  validateFName: String;
  validateLName: String;
  validateEmail: String;
  validateFPass: String;
  validateLPass: String;
  validateSex: String;
  isSpiner: Boolean;
  userLang: String;
  iPInfo: any;
  constructor(private userService: UserService, private loginService: LoginService) {
    this.user = new User();
    this.userInformation = new UserInformation();
    this.worningRegistrationStatus = false;
    this.isSpiner = false;
    this.userLang = navigator.language;
  }

  ngOnInit() {
    this.IPInfo();
  }

  IPInfo() {
    this.loginService.getIPInfo().subscribe(res => {
      this.iPInfo = res;
    })
  }

  ngLogin() {
    this.ngClose.emit({status: true, message: 'LOGIN'});
  }

  validation() {
    if (this.user.firstName === undefined) {
      this.validateFName = 'alert-validate';
      return false;
    } else if (this.user.lastName === undefined) {
      this.validateLName = 'alert-validate';
      return false;
    } else if (this.user.email === undefined) {
      this.validateEmail = 'alert-validate';
      return false;
    } else if (this.user.password === undefined) {
      this.validateFPass = 'alert-validate';
      return false;
    } else if (this.userInformation.sex === undefined) {
      this.validateSex = 'alert-validate';
    } else {
      return true;
    }
  }

  ngNewRegistration() {
    this.isSpiner = true;
    if (this.validation()) {
      this.loginService.registration(this.user, this.userInformation, this.userLang, this.iPInfo)
      .subscribe(res => {
        if (res['message'] === 'SUCCESS') {
          this.userInformation = new UserInformation();
          this.user = new User();
          this.isSpiner = false;
          this.ngClose.emit({status: true, message: 'SUCCESS_CREAT_PROFILE'});
        } else {
          this.isSpiner = false;
          this.ngClose.emit({status: false, message: res['message']});
        }
      }, err => {
        this.ngClose.emit({status: false, message: 'ERROR_SERVER_NOT_FOUND'});
        this.isSpiner = false;
      });
    }
  }

}
