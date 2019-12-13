import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-restart',
  templateUrl: './restart.component.html',
  styleUrls: ['./restart.component.css']
})
export class RestartComponent implements OnInit {
  @Output() ngClose = new EventEmitter<Boolean>();
  @Output() ngNotFound = new EventEmitter<Boolean>();
  @Output() ngStatus = new EventEmitter<Object>();

  user: User;
  isSpiner: Boolean;
  constructor(private userService: UserService, private router: Router) {
    this.user = new User();
    this.isSpiner = false;
  }

  ngOnInit() {
  }

  ngLogin() {
    this.ngClose.emit(true);
  }

  ngSendCode() {
    this.isSpiner = true;
    this.userService.restartPassword(this.user).subscribe(res => {
      this.ngStatus.emit({status: true, email: this.user.email});
      this.isSpiner = false;
    }, err => {
      if (err['status'] === 404) {
        this.ngNotFound.emit(true);
      } else if (err['status'] === 403) {
        // TODO Not implement
      }
      this.isSpiner = false;
    })
  }
}
