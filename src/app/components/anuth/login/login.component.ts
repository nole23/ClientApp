import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from '../../../global/global';
import { User } from '../../../models/user';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  isSpiner: Boolean;
  picture: String;
  errorMessage: String;
  constructor(
    private loginService: LoginService,
    private global: Global,
    private router: Router
  ) {
    this.user = new User();
    this.isSpiner = false;
    this.picture = "../../../../assets/picture/bg-01.jpg";
    this.errorMessage = null;
  }

  ngOnInit() {
  }

  ngLogin() {
    this.isSpiner = true;
    this.errorMessage = null;
    this.loginService.login(this.user).subscribe(res =>{
      if (res['message'].toString() === 'SUCCESS_USER_IS_LOGIN') {
        this.global.ngLogin(true);
        this.router.navigate(['chat/list-user'])
      } else {

        this.errorMessage = '<span i18n="' +  res['message'] + '"';
        if (res['message'] === 'ERROR_UNAUTHORIZED' || res['message'] === 'ERROR_NOT_FIND_USER') {
          this.errorMessage += ' class="text-red">' +
          'Email ili sifra nisu ispravni. Molimo vas proverite da li ste uneli ispravne podatke' +
          '</span>'
        } else if (res['message'] === 'ERROR_PROFILE_NOT_VERIFY') {
          this.errorMessage += ' class="text-orange">' +
          'Nalog ne postoji ili je deaktiviran. ' +
          'Da bi ste ponovo vratili vas nalog posaljite zahtev za aktivaciju naloga' +
          '</span>'
        }
      }

      this.isSpiner = false;
    })
  }
}
