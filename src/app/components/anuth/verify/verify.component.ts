import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  @Output() ngRestartPassword = new EventEmitter<Boolean>();
  @Output() ngClose = new EventEmitter<Boolean>();
  @Output() ngNotCodeCorect = new EventEmitter<Boolean>();
  @Output() ngSavePassword = new EventEmitter<Boolean>();
  @Input() email: String;

  code: String;
  isNewEmail: Boolean;
  password: String;
  passwordOne: String;
  validatePassword: String;
  isSpinerSend: Boolean;
  isSpinerUpdate: Boolean;
  constructor(private userService: UserService) {
    this.isNewEmail = false;
    this.validatePassword = '';
    this.isSpinerSend = false;
    this.isSpinerUpdate = false;
  }

  ngOnInit() {
  }

  ngOpenRestartPassword() {
    this.ngRestartPassword.emit(true);
  }

  ngSendCode() {
    this.isSpinerSend = true;
    this.userService.checkCode(this.code, this.email).subscribe(res => {
      this.isNewEmail = true;
      this.isSpinerSend = false;
    }, err =>{
      if (err['status'] === 403) {
        this.ngNotCodeCorect.emit(true);
      } else if (err['status'] === 404) {
        // TODO 
      }
      this.isSpinerSend = false;
    })
  }

  ngLogin() {
    this.ngClose.emit(true);
  }

  ngUpdatePassword() {
    this.isSpinerUpdate = true;
    if (this.password !== this.passwordOne) {
      this.validatePassword = 'alert-validate';
      this.isSpinerUpdate = false;
    } else {
      this.userService.newPassword(this.password, this.email, this.code).subscribe(res =>{
        this.ngSavePassword.emit(true);
      }, err =>{
        // TODOO
        this.isSpinerUpdate = false;
      })
    }
  }

}
