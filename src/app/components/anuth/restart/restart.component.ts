import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Global } from '../../../global/global';

@Component({
  selector: 'app-restart',
  templateUrl: './restart.component.html',
  styleUrls: ['./restart.component.css']
})
export class RestartComponent implements OnInit {
  private readonly notifier: NotifierService;

  user: User;
  isSpiner: Boolean;
  picture: String;
  errorMessage: String;
  constructor(
    notifier: NotifierService,
    private userService: UserService, 
    private router: Router,
    private global: Global
  ) {
    this.user = new User();
    this.isSpiner = false;
    this.picture = "../../../../assets/picture/bg-01.jpg";
    this.errorMessage = null;
  }

  ngOnInit() {
  }

  ngSendCode() {
    this.isSpiner = true;
    this.errorMessage = null;
    this.userService.restartPassword(this.user).subscribe(res => {
      if (res['status']) {
        this.global.setRestartEmail(this.user.email);
        
        this.router.navigate(['verify-code'])
      } else {
        this.errorMessage = '<span i18n="' +  res['message'] + '"';
        if (res['message'] === 'ERROR_SERVER_NOT_FOUND' || res['message'] === 'ERROR_NOT_FIND_USER') {
          this.errorMessage += ' class="text-red">' +
          'Email nije pronadjen. Molimo vas proverite da li ste uneli ispravne podatke' +
          '</span>'
        } else if (res['message'] === 'ERROR_PROFILE_NOT_VERIFY') {
          this.errorMessage += ' class="text-orange">' +
          'Nalog nije verifikovan, molimo vas prvo verifikujte vas nalog' +
          '</span>'
        }
      }

      this.isSpiner = false;
    })
  }
}
