import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteFriendsComponent } from '../../plagin/modal/delete-friends/delete-friends.component';
import { UserService } from '../../../services/user.service';
import { Global } from '../../../global/global';

@Component({
  selector: 'app-list-notification-visitor',
  templateUrl: './list-notification-visitor.component.html',
  styleUrls: ['./list-notification-visitor.component.css']
})
export class ListNotificationVisitorComponent implements OnInit, OnDestroy {
  @Input() item: any;
  @Output() emit = new EventEmitter<any>();

  isAdd: Boolean;
  isDelete: Boolean;
  constructor(
    public matDialog: MatDialog,
    private userService: UserService,
    private global: Global
  ) {
    this.isDelete = false;
    this.isAdd = false;
  }

  ngOnInit() {
  }

  addFriend(item: any, type: Boolean) {
    if (type) {
      this.isAdd = true;
      this.userService.acceptRelatuonship(item.friend).subscribe(res => {
        this.isAdd = false;
        this.emit.emit({item: item, type: 'accept', status: res['message']})
      })
    } else {
      this.isDelete = true;
      this.userService.removeRelationship(item.friend).subscribe(res => {
        this.isDelete = false;
        this.emit.emit({item: item, type: 'remove', status: res['message']})
      })
    }
  }

  ngOnDestroy() {
    this.isDelete = false;
    this.isAdd = false;
    this.item = null;
  }
}
