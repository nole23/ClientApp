import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../../services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-delete-friends',
  templateUrl: './delete-friends.component.html',
  styleUrls: ['./delete-friends.component.css']
})
export class DeleteFriendsComponent implements OnInit {
  private readonly notifier: NotifierService;

  constructor(
    public dialogRef: MatDialogRef<DeleteFriendsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    notifier: NotifierService
  ) { 
    this.notifier = notifier;
  }


  ngOnInit() { 
  }

  closeModal(_id: any = null) {
    this.dialogRef.close(_id);
  }

  ngDeleteItem() {
    this.userService.deleteFriends(this.data['item']).subscribe((res: any) => {
      this.closeModal({id: this.data['item']['_id']});
    }, (err: any) => {
      this.notifier.notify('error', 'Nismo mogli da obrisemo, probajte kasnije');
      this.closeModal(null)
    })
  }


}
