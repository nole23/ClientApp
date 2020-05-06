import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
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
  private readonly notifier: NotifierService;

  selectedFilesHeaderImage: File = null;
  urls: any;
  fd = new FormData();
  me: User;
  constructor(
    notifier: NotifierService,
    public dialogRef: MatDialogRef<UpdateProfilImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private mediaService: MediaService,
    private global: Global
  ) {
    this.notifier = notifier;
    this.urls = null;
  }

  ngOnInit() {
    this.me = new User(JSON.parse(localStorage.getItem('user')));
  }

  closeModal(message: any = null) {
    this.dialogRef.close(message);
  }

  onSelectImgForHeader(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFilesHeaderImage = <File>event.target.files[0];

      reader.onload = (event) => { 
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

    this.mediaService.saveImageProfile(this.fd, name.toString()).subscribe(res => {
      if (res['message'] === 'ERROR_NOT_SAVE_IMAGE') {
        this.notifier.notify('error', 'Profilna slika nije azurirana')
      } else {
        this.notifier.notify( 'success', 'Uspjesno ste postavili sliku');
        this.global.setProfileImage(res['message']);
        this.ngRestore();
        this.closeModal(res['message']);
      }
    })
  }

}
