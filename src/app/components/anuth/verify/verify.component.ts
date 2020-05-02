import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Global } from '../../../global/global';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  code: String;
  isNewEmail: Boolean;
  password: String;
  passwordOne: String;
  validatePassword: String;
  isSpinerSend: Boolean;
  isSpinerUpdate: Boolean;
  picture: String;
  email: String;
  errorMessage: String;
  constructor(
    private userService: UserService,
    private router: Router,
    private global: Global
  ) {
    this.isNewEmail = false;
    this.validatePassword = '';
    this.isSpinerSend = false;
    this.isSpinerUpdate = false;
    this.picture = "../../../../assets/picture/bg-01.jpg";
    this.email = JSON.parse(localStorage.getItem('restartEmail'));
    this.errorMessage = null;
  }

  ngOnInit() {
  }

  ngSendCode() {
    this.isSpinerSend = true;
    this.errorMessage = null;
    this.userService.checkCode(this.code, this.email).subscribe(res => {

      if (res['message'] === 'SUCCESS_SAVE') {
        this.isNewEmail = true;
        this.isSpinerSend = false;
      } else {
        this.errorMessage = '<span i18n="' +  res['message'] + '"';
        if (res['message'] === 'ERROR_NOT_FIND_USER') {
          this.errorMessage += ' class="text-red">' +
          'Email nije pronadjen. Moracete ponovo da posaljete zahtev za kod' +
          '</span>'
        } else if (res['message'] === 'ERROR_VERIFICATION_CODE_IS_ERROR') {
          this.errorMessage += ' class="text-orange">' +
          'Kod nije tacan, posaljite novi zahtev za kod' +
          '</span>'
        } else if (res['message'] === 'ERROR_SERVER_NOT_FOUND') {
          this.errorMessage += ' class="fs-14">' +
          'Server nije dostupan probajte malo kasnije. Hvala vas TwoWay' +
          '</span>'
        }
      }
    })
  }


  ngUpdatePassword() {
    this.isSpinerUpdate = true;
    if (this.password !== this.passwordOne) {
      this.validatePassword = 'alert-validate';
      this.isSpinerUpdate = false;
    } else {
      this.userService.newPassword(this.password, this.email, this.code).subscribe(res =>{
        if (res['message'] === 'SUCCESS_SAVE') {
          this.global.removeRestartEmail();
          this.router.navigate(['/']);
        } else {
          this.errorMessage = '<span i18n="' +  res['message'] + '"';
          if (res['message'] === 'ERROR_NOT_FIND_USER') {
            this.errorMessage += ' class="text-red">' +
            'Email nije pronadjen. Moracete ponovo da posaljete zahtev za kod' +
            '</span>'
          } else if (res['message'] === 'ERROR_VERIFICATION_CODE_IS_ERROR') {
            this.errorMessage += ' class="text-orange">' +
            'Kod nije tacan, posaljite novi zahtev za kod' +
            '</span>'
          } else if (res['message'] === 'ERROR_SERVER_NOT_FOUND') {
            this.errorMessage += ' class="fs-14">' +
            'Server nije dostupan probajte malo kasnije. Hvala vas TwoWay' +
            '</span>'
          }
        }
      })
    }
  }

}
