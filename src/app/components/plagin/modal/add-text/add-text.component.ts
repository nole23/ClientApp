import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { PublicationService } from '../../../../services/publication.service';

@Component({
  selector: 'app-add-text',
  templateUrl: './add-text.component.html',
  styleUrls: ['./add-text.component.css']
})
export class AddTextComponent implements OnInit {

  private readonly notifier: NotifierService;

  text: String;
  constructor(
    public dialogRef: MatDialogRef<AddTextComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private publicationService: PublicationService,
    notifier: NotifierService,
  ) {
    this.text = null;
    this.notifier = notifier;
  }

  ngOnInit() {
  }

  saveText() {
    if (this.text !== null) {
      this.publicationService.saveText({message: this.text}).subscribe((res: any) => {
        if (res['message'] === 'ERROR_NOT_SAVE_TEXT') {
          this.notifier.notify( 'warning', 'Niste uspjeli da dodate novu objavu')
        } else {
          this.closeModal(res['message']);
        }
      })
    } else {
      this.notifier.notify( 'warning', 'Morate uneti neki tekst')
    }
  }

  closeModal(message: any = null) {
    this.dialogRef.close(message);
  }

}
