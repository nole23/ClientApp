import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from '../../../models/user';
import { DeleteFriendsComponent } from '../modal/delete-friends/delete-friends.component';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  @Input() item: User;
  @Input() user: any;
  @Output() emit = new EventEmitter<any>();

  constructor(public matDialog: MatDialog,) { }

  ngOnInit() { }

  deleteFriends() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.minWidth = "400px";
    dialogConfig.data = {
      item: this.item
    }
    const modalDialogRemoveFriend = this.matDialog.open(DeleteFriendsComponent, dialogConfig);
    modalDialogRemoveFriend.afterClosed().subscribe(result => {
      // Ako se sjetim nesto da uradim
      if (result !== null) {
        this.emit.emit(result);
      }
    })
  }

}
