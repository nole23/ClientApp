import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PublicationImageComponent } from '../../plagin/modal/publication-image/publication-image.component';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { MediaService } from '../../../services/media.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  @ViewChild('myimage') myimage: ElementRef;
  @ViewChild('image') image: ElementRef;
  @Input() item: any;
  @Input() user: any;

  showerChat: String;
  addComment: String;
  me: User;
  test: Boolean;
  isComment: String;
  constructor(
    private userService: UserService,
    public matDialog: MatDialog,
    private mediaService: MediaService
  ) { 
    this.showerChat = 'hide';
    this.addComment = null;
    this.me = JSON.parse(localStorage.getItem('user'));
    this.test = false;
    this.isComment = 'hide';
  }

  ngOnInit() { 
    console.log(this.item)
  }

  openComentar() {
    // console.info('ProfileComponent.openComentar() - Show and open component');
    if (this.showerChat === 'hide') {
      this.showerChat = 'show';
    } else {
      this.showerChat = 'hide';
    }
  }

  sendMessage(event: any, item: any) {
    // console.info('ProfileComponent.sendMessage() - Add comment to publication');
    if (event.keyCode === 13) {
      let comments = {
        user: this.me,
        dateComent: Date(),
        text: this.addComment
      }
      this.isComment = 'show';
      this.userService.addComment(this.item, comments).subscribe(res => {

        item.comments.push(comments);
        this.addComment = null;
        this.isComment = 'hide';
      })
      
    }
  }

  likePublication() {
    // console.info('ProfileComponent.likePublication() - Click like/dislike in publication');
    this.userService.likePublication(this.user, this.item).subscribe(res => {
      this.item.likes.push(this.user._id);
    })
  }

  disLikePublication() {
    // console.info('ProfileComponent.likePublication() - Click like/dislike in publication');
    this.userService.dislikePublication(this.user, this.item).subscribe(res => {
      this.item.likes.splice(this.user._id, 1);
    })
  }

  openImage(item: String) {
    // console.info('ProfileComponent.openImage() - Open modal for image');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.minWidth = "400px";
    dialogConfig.data = {
      item: item,
      isDisable: this.userService.isPicturDiferent(item['image'])
    }
    const modalDialogProfile = this.matDialog.open(PublicationImageComponent, dialogConfig);
    modalDialogProfile.afterClosed().subscribe(result =>{
      this.editStatus(result, item);
    })
  }

  editStatus(type: String, i: any) {
    if (type === null) {
      // This is noting
    } else if (type === 'like') {
      if (this.item._id.toString() === i._id.toString()) {
        this.item.likes.push(this.me._id)
      }
    } else if (type === 'dislike') {
      if (this.item._id.toString() === i._id.toString()) {
        this.item.likes.splice(this.me._id, 1)
      }
    }
  }

  isStatusButton(list: any) {
    return this.mediaService.isStatusButton(list, this.me);
  } 

  editStyle(link: String) {
    console.log(this.image)
    return link
  }
}
