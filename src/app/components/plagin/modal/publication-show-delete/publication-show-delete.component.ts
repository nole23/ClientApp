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
    console.log(this.data)
    this.type = this.data['status']
  }

  closeModal(_id: any = null) {
    this.dialogRef.close(_id);
  }

  ngDeleteItem() {
    console.log('Obrisati objavu')
    this.publicationService.deletePublicaton(this.data['item']).subscribe((res: any) => {
      this.notifier.notify('success', 'Uspjesno ste obrisali')
      this.closeModal({'public' : res['message'], 'type': 'delete'});
    })
  }

  ngPublicAgain() {
    this.publicationService.publicAgain(this.data['item']).subscribe((res: any) => {
      this.notifier.notify('success', 'Uspjesno ste objavili')
      this.closeModal({'public' : res['message'], 'type': 'public'});
    })
  }

}
