import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  isOwner : Boolean;
  constructor() {
    this.isOwner = false;
  }

  ngOnInit() {
  }

}
