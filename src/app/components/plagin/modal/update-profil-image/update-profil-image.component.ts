import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { MediaService } from '../../../../services/media.service';
import { Global } from '../../../../global/global'

@Component({
  selector: 'app-update-profil-image',
  templateUrl: './update-profil-image.component.html',
  styleUrls: ['./update-profil-image.component.css']
})
export class UpdateProfilImageComponent implements OnInit {

  selectedFilesHeaderImage: File = null;
  urls: any;
  fd = new FormData();
  me: User;
  constructor(
    public dialogRef: MatDialogRef<UpdateProfilImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private mediaService: MediaService,
    private global: Global
  ) {
    this.urls = null;
  }

  ngOnInit() {
    this.me = new User(JSON.parse(localStorage.getItem('user')));
  }

  closeModal(message: any = null) {
    this.dialogRef.close(message);
  }

  onSelectImgForHeader(event: any) {
    // console.info('ProfileComponent.onSelectImgForHeader() - push button and select image in local file');
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
    // console.info('ModalDialog.ngSaveImageHeader() - push button and save selected images');
    var datetimestamp = Date.now();
    let name = this.me.username + '.' + this.me._id + '.' + datetimestamp;
    this.fd.append('file', this.selectedFilesHeaderImage, name.toString());

    this.mediaService.saveImageProfile(this.fd, name.toString()).subscribe(res => {
      this.global.setProfileImage(name);
      this.ngRestore();
      this.closeModal({status: true});
    })
  }

}
