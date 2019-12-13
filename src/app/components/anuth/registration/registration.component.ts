import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../../../models/user';
import { UserInformation } from '../../../models/user-information';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @Output() ngClose = new EventEmitter<Boolean>();
  @Output() ngEmailNotCorect = new EventEmitter<Boolean>();

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
  constructor(private userService: UserService) {
    this.user = new User();
    this.userInformation = new UserInformation();
    this.worningRegistrationStatus = false;
    this.isSpiner = false;
  }

  ngOnInit() {
  }

  ngLogin() {
    this.ngClose.emit(true);
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
      this.userService.registration(this.user, this.userInformation)
      .subscribe(res => {
        this.ngClose.emit(true);
        this.userInformation = new UserInformation();
        this.user = new User();
        this.isSpiner = false;
      }, err => {
        if (err['status'] === 400) {
          this.validation();
        } else if (err['status'] === 403) {
          this.ngEmailNotCorect.emit(true);
          this.isSpiner = false;
        }
      });
    }
  }

}
