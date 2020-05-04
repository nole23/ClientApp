import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-mail-verify',
  templateUrl: './mail-verify.component.html',
  styleUrls: ['./mail-verify.component.css']
})
export class MailVerifyComponent implements OnInit {
  private readonly notifier: NotifierService;

  constructor(
    notifier: NotifierService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {
    this.notifier = notifier;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res =>{
      this.verify(res);
    });
  }

  verify(data: any) {
    this.loginService.verifyCode(data).subscribe(res =>{
      if (res) {
        this.notifier.notify('success', 'Profil je verifikovan')
        this.router.navigate(['/']);
      } else {
        this.notifier.notify('error', 'Profil nije verifikovan, zatrazite novu kod')
      }
    })
  }
}
