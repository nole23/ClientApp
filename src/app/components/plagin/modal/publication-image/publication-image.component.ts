import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { User } from '../../../../models/user';
import { Publication } from '../../../../models/publication';
import { UserService } from '../../../../services/user.service';
import { MediaService } from '../../../../services/media.service';

@Component({
  selector: 'app-publication-image',
  templateUrl: './publication-image.component.html',
  styleUrls: ['./publication-image.component.css']
})
export class PublicationImageComponent implements OnInit {

  private readonly notifier: NotifierService;

  me: User;
  imageLink: Publication;
  isDisable: Boolean;
  statusLike: any;
  isMe: Boolean;
  constructor(
    notifier: NotifierService,
    public dialogRef: MatDialogRef<PublicationImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private mediaService: MediaService
  ) {
    this.notifier = notifier;
    this.imageLink = null;
    this.statusLike = null;
    this.isMe = false;
  }

  ngOnInit() {
    this.me = new User(JSON.parse(localStorage.getItem('user')));
    this.imageLink = new Publication(this.data['item']);
    this.isMe = (this.data['item']['user_id']['_id'].toString() === this.me._id.toString())
    this.isDisable = this.data['isDisable'];
    this.imageLink['isStatus'] = this.isStatusButton(this.data['item']['likes']);
  }

  closeModal() {
    this.dialogRef.close(this.statusLike);
  }

  addToProfile(item: any) {
    if (!this.isDisable) {
      this.userService.updateImageProfile(item.image).subscribe(res => {
        this.notifier.notify('success', 'Uspjesno ste postavili profilnu sliku')
        this.userService.setImageInLocalstorage(item.image);
        
      }, err => {
        this.notifier.notify('warning', 'Nismo mogli da obradimo ovaj zahtev')
      })
    } else {
      this.notifier.notify('info', 'Ova slika je vec profilna')
    }
  }

  likeDislike(image: Publication) {
    if (!image['isStatus']) {
      this.userService.likePublication(this.me, image).subscribe(res => {
        this.imageLink.likes.push({user: this.me});
        this.statusLike = 'like'
      })
    } else {
      this.userService.dislikePublication(this.me, image).subscribe(res => {
        this.imageLink.likes.splice(0, 1);
        this.statusLike = 'dislike'
      })
    }
    this.imageLink['isStatus'] = !this.imageLink['isStatus'];
    
  }

  isStatusButton(list: any) {
    return this.mediaService.isStatusButton(list, this.me);
  } 

}
