import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { MediaService } from '../../../../services/media.service';

@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.component.html',
  styleUrls: ['./add-picture.component.css']
})
export class AddPictureComponent implements OnInit {
  private readonly notifier: NotifierService;

  selectedFilesHeaderImage: File = null;
  urls: any;
  fd = new FormData();
  me: User;
  text: any;
  constructor(
    notifier: NotifierService,
    public dialogRef: MatDialogRef<AddPictureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private mediaService: MediaService
  ) {
    this.notifier = notifier;
    this.urls = null;
    this.text = null;
    this.me = new User(JSON.parse(localStorage.getItem('user')));
  }

  ngOnInit() {
  }

  closeModal(message: any = null) {
    this.dialogRef.close(message);
  }

  onSelectImgForHeader(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.selectedFilesHeaderImage = <File>event.target.files[0];

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.urls = event.target['result'];
      }
    }
  }

  ngRestore() {
    if (this.selectedFilesHeaderImage === null) {
      this.closeModal();
    }
    this.selectedFilesHeaderImage = null;
    this.urls = null;
    this.fd = new FormData();
  }

  saveImages() {
    var datetimestamp = Date.now();
    let name = this.me.username + '.' + this.me._id + '.' + datetimestamp;
    this.fd.append('file', this.selectedFilesHeaderImage, name.toString());

    const addPictureConstruct = {
      image: '',
      text: this.text,
      cordinate: {}
    };

    this.mediaService.addPicture(this.fd, name.toString(), addPictureConstruct).subscribe(res => {
      if (res['message'] === 'ERROR_NOT_SAVE_IMAGE') {
        this.notifier.notify('error', 'Slika nije sacuvana, ili je doslo do greske na serveru')
      } else {
        this.ngRestore();
        this.closeModal({publication: res['message'], media: res['media']});
      }
    })
  }

}
