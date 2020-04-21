import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.css']
})
export class ListNotificationComponent implements OnInit {
  @Input() item: any;

  constructor() { }

  ngOnInit() {
    console.log(this.item)
  }

}
