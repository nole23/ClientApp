import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { MediaService } from '../../../../services/media.service';

@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.component.html',
  styleUrls: ['./add-picture.component.css']
})
export class AddPictureComponent implements OnInit {

  selectedFilesHeaderImage: File = null;
  urls: any;
  fd = new FormData();
  me: User;
  text: any;
  constructor(
    public dialogRef: MatDialogRef<AddPictureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private mediaService: MediaService
  ) {
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
      this.ngRestore();
      this.closeModal('success');
    }, err => {
      this.closeModal('error')
    })
  }

}
