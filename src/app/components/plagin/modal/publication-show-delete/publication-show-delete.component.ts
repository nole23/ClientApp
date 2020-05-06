import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PublicationService } from '../../../../services/publication.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-publication-show-delete',
  templateUrl: './publication-show-delete.component.html',
  styleUrls: ['./publication-show-delete.component.css']
})
export class PublicationShowDeleteComponent implements OnInit {
  private readonly notifier: NotifierService;

  type: String;
  constructor(
    public dialogRef: MatDialogRef<PublicationShowDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private publicationService: PublicationService,
    notifier: NotifierService,
  ) {
    this.notifier = notifier;
  }

  ngOnInit() {
    this.type = this.data['status']
  }

  closeModal(_id: any = null) {
    if (_id === null) {
      this.dialogRef.close({'public' : _id, 'type': 'nothing'});
    } else {
      this.dialogRef.close(_id);
    }
  }

  ngDeleteItem() {
    this.publicationService.deletePublicaton(this.data['item']).subscribe((res: any) => {
      if (res['message'] === 'ERROR_NOT_DELETE_ITEM') {
        this.notifier.notify('error', 'Nismo uspjeli da obrisemo datu objavu')
      } else {
        this.notifier.notify('success', 'Objava je obrisana')
        this.closeModal({'public' : res['message'], 'type': 'delete'});
      }
    })
  }

  ngPublicAgain() {
    this.publicationService.publicAgain(this.data['item']).subscribe((res: any) => {
      if (res['message'] === 'ERROR_NOT_SAVE_AGAIN') {
        this.notifier.notify('error', 'Nismo uspjeli da ponovo objavimo ovu objavu')
      } else {
        this.notifier.notify('success', 'Ponovo smo reagovali na staru objavu')
        this.closeModal({'public' : res['message'], 'type': 'public'});
      }
    })
  }

}
