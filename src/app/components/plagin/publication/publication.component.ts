import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { PublicationImageComponent } from '../../plagin/modal/publication-image/publication-image.component';
import { PublicationShowDeleteComponent } from '../../plagin/modal/publication-show-delete/publication-show-delete.component';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { MediaService } from '../../../services/media.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  private readonly notifier: NotifierService;

  @Input() item: any;
  @Input() user: any;
  @Input() i: any;
  @Output() emit = new EventEmitter<any>();

  showerChat: String;
  addComment: String;
  me: User;
  test: Boolean;
  isComment: String;
  isContextMenu: Boolean;
  isDisable: Boolean;
  isButton: Boolean;
  isDisavleButtonForLike: Boolean;
  isSpinerStatusPublic: Boolean;
  constructor(
    notifier: NotifierService,
    private userService: UserService,
    public matDialog: MatDialog,
    private mediaService: MediaService
  ) { 
    this.notifier = notifier;
    this.showerChat = 'hide';
    this.addComment = null;
    this.me = JSON.parse(localStorage.getItem('user'));
    this.test = false;
    this.isComment = 'hide';
    this.isContextMenu = false;
    this.isDisable = true;
    this.isDisavleButtonForLike = false;
    this.isSpinerStatusPublic = false;
  }

  ngOnInit() {
    this.isStatusButton(this.item.likes);
  }


  openComentar() {
    if (this.showerChat === 'hide') {
      this.showerChat = 'show';
    } else {
      this.showerChat = 'hide';
    }
  }

  sendMessage(event: any, item: any) {
    if (event.keyCode === 13) {
      let comments = {
        user: this.me,
        dateComent: Date(),
        text: this.addComment
      }
      this.isComment = 'show';
      this.userService.addComment(this.item, comments).subscribe(res => {
        if (res['message'] === 'ERROR_NOT_SAVE_COMMENT') {
          this.notifier.notify('error', 'Komentar nije dodat, probajte malo kasnije')
        } else {
          item.comments.push(comments);
        }
        this.addComment = null;
        this.isComment = 'hide';
      })
      
    }
  }

  ngLikeDislike(type: Boolean) {
    this.isDisavleButtonForLike = true;
    if (type) {
      this.userService.likePublication(this.user, this.item).subscribe(res => {
        if (res) {
          this.item.likes.push(this.me._id);
        } else {
          this.notifier.notify('error', 'Server trenutno nije dostupan')
        }
        this.isDisavleButtonForLike = false;
      })
    } else if (!type) {
      this.userService.dislikePublication(this.user, this.item).subscribe(res => {
        if (res) {
          let index = this.item.likes.indexOf(this.user._id)
          this.item.likes.splice(index, 1);
        } else {
          this.notifier.notify('error', 'Server trenutno nije dostupan')
        }
        this.isDisavleButtonForLike = false;
      })
    }
  }

  openImage(item: String) {
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
    } else if (type === 'like') {
      if (this.item._id.toString() === i._id.toString()) {
        this.item.likes.push(this.me._id);
      }
    } else if (type === 'dislike') {
      if (this.item._id.toString() === i._id.toString()) {
        this.item.likes.splice(this.me._id, 1);
      }
    }
  }
  
  isStatusButton(list: any) {
    return this.mediaService.isStatusButton(list, this.me);
  }

  ngShowHidePublic(item: any, status: String) {
    this.isSpinerStatusPublic = true;
    this.userService.showHidePublication(item, status).subscribe((res: any) => {
      if (status === 'friends') {
        item.showPublication.removeStatus = false;
        item.showPublication.justFriends = true;
      } else if (status === 'show') {
        item.showPublication.removeStatus = false;
        item.showPublication.justFriends = false;
      } else if (status === 'hide') {
        item.showPublication.removeStatus = true;
        item.showPublication.justFriends = false;
      }

      this.isSpinerStatusPublic = false;
    })
  }

  ngShowAgain(item: any, status: String) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.maxWidth = "400px";
    dialogConfig.data = {
      item: item,
      status: status
    }
    const modalDialogShowDelete = this.matDialog.open(PublicationShowDeleteComponent, dialogConfig);
    modalDialogShowDelete.afterClosed().subscribe(result =>{
      if (result !== null) {
        this.emit.emit(result);
      }
    })
  }
}
