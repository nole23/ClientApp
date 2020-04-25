import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteFriendsComponent } from '../../plagin/modal/delete-friends/delete-friends.component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-list-notification-visitor',
  templateUrl: './list-notification-visitor.component.html',
  styleUrls: ['./list-notification-visitor.component.css']
})
export class ListNotificationVisitorComponent implements OnInit {
  @Input() item: any;

  isAdd: Boolean;
  isDelete: Boolean;
  constructor(
    public matDialog: MatDialog,
    private userService: UserService
  ) {
    this.isDelete = false;
    this.isAdd = false;
  }

  ngOnInit() {
  }

  addFriend(item: any, type: Boolean) {
    if (type) {
      this.isAdd = true;
      this.userService.sendRelationship(item.friend).subscribe(res => {
        if (res['message'] === 'save') {
          this.isAdd = false;
        } else {
          this.isAdd = false;
        }
      }, err => {
        this.isAdd = false;
      })
    } else {
      this.isDelete = true;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.id = "modal-component";
      dialogConfig.minWidth = "400px";
      dialogConfig.data = {
        item: item.friend
      }
      const modalDialogRemoveFriend = this.matDialog.open(DeleteFriendsComponent, dialogConfig);
      modalDialogRemoveFriend.afterClosed().subscribe(result => {
        this.isDelete = false;
      })
    }
  }
}
