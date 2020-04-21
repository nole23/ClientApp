import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-notification-visitor',
  templateUrl: './list-notification-visitor.component.html',
  styleUrls: ['./list-notification-visitor.component.css']
})
export class ListNotificationVisitorComponent implements OnInit {
  @Input() item: any;

  constructor() { }

  ngOnInit() {
    console.log(this.item)
  }

}
