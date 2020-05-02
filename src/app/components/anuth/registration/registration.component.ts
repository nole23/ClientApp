import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { UserInformation } from '../../../models/user-information';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

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
  picture: String;
  errorMessage: String;
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.user = new User();
    this.userInformation = new UserInformation();
    this.worningRegistrationStatus = false;
    this.isSpiner = false;
    this.userLang = navigator.language;
    this.picture = "../../../../assets/picture/bg-01.jpg";
  }

  ngOnInit() {
    this.IPInfo();
  }

  IPInfo() {
    this.loginService.getIPInfo().subscribe(res => {
      this.iPInfo = res;
    })
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
    this.errorMessage = null;
    if (this.validation()) {
      this.loginService.registration(this.user, this.userInformation, this.userLang, this.iPInfo).subscribe(res => {
        if (res['message'] === 'SUCCESS') {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = '<span i18n="' +  res['message'] + '"';
          if (res['message'] === 'ERROR_NULL_POINTER_EXEPTION') {
            this.errorMessage += ' class="text-orange">' +
                                  'Nisu svi podaci popunjeni, proverite podatke' +
                                  '</span>'
          } else if (res['message'] === 'ERROR_NOT_SAVE_CONFIGURATION' || res['message'] === 'ERROR_NOT_SAVE_INFORMATION') {
            this.errorMessage += ' class="text-orange">' +
                                  'Neke od informacija nisu se uspesno sacuvale, probajte ponovo kreirati nalog' +
                                  '</span>'
          } else if (res['message'] === 'ERROR_EMAIL_NOT_FREE') {
            this.errorMessage += ' class="text-red">' +
                                  'Email je zauzet, ako se ne secate sifre restartujte sifru' +
                                  '</span>'
          }
        }
        this.isSpiner = false;
      })
    }
  }

  ngOnDestroy() {
    this.user = new User();
    this.userInformation = new UserInformation();
    this.worningRegistrationStatus = false;
    this.worningRegistrationStatus = false;
  }
}
