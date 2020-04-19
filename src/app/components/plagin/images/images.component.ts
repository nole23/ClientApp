import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ImageGalleryComponent } from '../../plagin/modal/image-gallery/image-gallery.component';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  @Input() item: any;
  @Input() imagesList: any;
  me: any;

  showButton: Boolean;
  constructor(
    public matDialog: MatDialog
  ) {
    this.me = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.isButtonFriend();
  }

  isButtonFriend() {
    if (this.me._id.toString() === this.item.user._id.toString()) {
      this.showButton = true;
    }
  }

  openImage(link: String, index: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.minWidth = "400px"

    dialogConfig.data = {
      link: link,
      index: index,
      imagesList: this.imagesList
    }
    
    const modalDialogProfile = this.matDialog.open(ImageGalleryComponent, dialogConfig);
  }
}
