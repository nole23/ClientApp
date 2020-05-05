import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { User } from '../../../models/user';
import { UserInformation } from '../../../models/user-information';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  private readonly notifier: NotifierService;

  user: User;
  userInformation: UserInformation;
  worningRegistrationStatus: Boolean;
  validateFName: String;
  validateLName: String;
  validateEmail: String;
  validateFPass: String;
  validateLPass: String;
  validateSex: String;
  validateDate: String;
  isSpiner: Boolean;
  userLang: String;
  iPInfo: any;
  picture: String;
  errorMessage: String;
  frstPassword: String;
  lastPassword: String;
  passwordErrorMessage: String;
  timer: any;
  data: any;
  mount: any;
  year: any;
  day: String;
  moun: String;
  years: String;
  constructor(
    notifier: NotifierService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.notifier = notifier;
    this.user = new User();
    this.userInformation = new UserInformation();
    this.worningRegistrationStatus = false;
    this.isSpiner = false;
    this.userLang = navigator.language;
    this.picture = "../../../../assets/picture/bg-01.jpg";
    this.data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    this.mount = [
      {i: 1, item: 'Januar'},
      {i: 2, item: 'Februar'},
      {i: 3, item: 'Mart'},
      {i: 4, item: 'April'},
      {i: 5, item: 'Maj'},
      {i: 6, item: 'Jun'},
      {i: 7, item: 'Jul'},
      {i: 8, item: 'Avgust'},
      {i: 9, item: 'Septembar'},
      {i: 10, item: 'Oktobar'},
      {i: 11, item: 'Novembar'},
      {i: 12, item: 'Decembar'},
    ];
    this.year = [];
    this.moun = 'meseci';
    this.day = 'dan';
    this.years = 'godina';
  }

  ngOnInit() {
    let dt = new Date().getFullYear();
    for (let i = dt; i > (dt - 101); i--) {
      this.year.push(i)
    }
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
      this.passwordErrorMessage = 'Sifra je obavezna'
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
          this.notifier.notify('succes', 'Uspesno ste kreirali nalog. Ostalo je jos da potvrdite nalog preko vaseg emaila.')
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

  verificationPassword(status: Boolean) {
    this.validateFPass = '';
    this.validateLPass = '';
    if (this.frstPassword.length < 6) {
      this.validateFPass = 'alert-validate'
    } else {
      this.validateFPass = '';
      clearTimeout(this.timer);
      if (status) {
        this.timer = setTimeout(() => {this.verificationPassword(false) },1000);
      } else {
        if (this.frstPassword.toString() === this.lastPassword.toString()) {
          this.validateLPass = 'true-validate';
          this.user.password = this.lastPassword;
        } else {
          this.validateLPass = 'alert-validate';
        }
      }
    }
  }

  cleerVerification() {
    this.validateFPass = '';
    this.validateLPass = '';
  }

  verifyMoun(event: any) {
    if (this.moun.toString() === '2') {
      this.data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
    } else if (this.moun.toString() === '4') {
      this.data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    } else if (this.moun.toString() === '6') {
      this.data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    } else if (this.moun.toString() === '9') {
      this.data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    } else if (this.moun.toString() === '11') {
      this.data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    } else {
      this.data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    }
  }

  verifyYears() {
    this.validateDate = ''
    if (this.day.toString() === 'dan') {
      this.validateDate = 'alert-validate'
    } else if (this.moun.toString() === 'meseci') {
      this.validateDate = 'alert-validate'
    } else if (this.years.toString() === 'godina') {
      this.validateDate = 'alert-validate'
    } else {
      this.validateDate = 'true-validate';
      let time = this.years + '-' + this.moun + '-' + this.day
      this.userInformation.dateOfBirth = new Date(time).getTime();
    }
  }

  verifyName(status: Boolean, type: String) {
    clearTimeout(this.timer);
    if (status) {
      this.timer = setTimeout(() => {this.verifyName(false, type) },1000);
    } else { 
      if (type.toString() === 'firstName') {
        this.validateFName = 'true-validate'
      } else if (type.toString() === 'lastName') {
        this.validateLName = 'true-validate';
      } else if (type.toString() === 'email') {
        this.validateEmail = 'true-validate';
      }
    }
  }

  ngOnDestroy() {
    this.user = new User();
    this.userInformation = new UserInformation();
    this.worningRegistrationStatus = false;
    this.worningRegistrationStatus = false;
  }
}
