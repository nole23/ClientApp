import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../../services/user.service';
import { MediaService } from '../../../../services/media.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {

  linkImage: String;
  imagesList: []
  index: any;
  publicInfo: any;
  isLike: Boolean;
  me: any;
  constructor(
    public dialogRef: MatDialogRef<ImageGalleryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private mediaService: MediaService
  ) {
    this.linkImage = null;
    this.publicInfo = null;
    this.me = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.linkImage = this.data.link.link;
    this.imagesList = this.data.imagesList;
    this.index = this.data.index;
    this.getPublicInfoForImage(this.data['link']['link']['_id'])
  }

  getPublicInfoForImage(id: any) {
    this.userService.getPublicByImage(id).subscribe(res =>{
      if (res['publication']['_id'] !== undefined) {
        this.publicInfo = res['publication']
        this.isLike = this.isStatusButton(this.publicInfo['likes'])
      } else {
        this.publicInfo = null;
        this.isLike = false;
      }
    })
  }

  closeModal() {
    this.dialogRef.close();
  }

  ngShift(type: String) {
    if (type === 'right') {
      this.index = this.index + 1;
      if (this.imagesList[this.index] === undefined) {
        this.index = 0;
      }
    } else if (type === 'left') {
      this.index = this.index - 1;
      if (this.imagesList[this.index] === undefined) {
        this.index = this.imagesList.length - 1;
      }
    }
    this.linkImage = this.imagesList[this.index]['link'];
    this.getPublicInfoForImage(this.linkImage['_id'])
  }

  keyDownFunction(event: any) {
    if (event['keyCode'] === 39) {
      this.ngShift('right')
    } else if (event['keyCode'] === 37) {
      this.ngShift('left')
    }
  }

  isStatusButton(list: any) {
    return this.mediaService.isStatusButton(list, this.me);
  }

  ngLikeDislike() {
    if (!this.isLike) {
      if (this.publicInfo !== null) {
        this.userService.likePublication(this.me, this.publicInfo).subscribe(res => {
          this.publicInfo.likes.push(this.me._id)
        })
      } else {
        // Ovde treba da napravimo prvi lajk
      }
    } else {
      this.userService.dislikePublication(this.me, this.publicInfo).subscribe(res => {
        let index = this.publicInfo.likes.findIndex(x => x === this.me._id.toStrint());
        this.publicInfo.likes.splice(index, 1);
      })
    }
  }
}
