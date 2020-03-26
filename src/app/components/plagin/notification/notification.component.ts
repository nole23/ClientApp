import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { UserService } from '../../../services/user.service';
import { MediaService } from '../../../services/media.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  isOwner : Boolean;
  notifications: any;
  openPublication: any;
  me: any;
  linkImage: String;
  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private mediaService: MediaService
  ) {
    this.isOwner = false;
    this.openPublication = null;
    this.linkImage = null;
  }

  ngOnInit() {
    this.me = JSON.parse(localStorage.getItem('user'));

    this.notificationService.getAllNotification().subscribe(res => {
      this.notifications = res;
    });
  }


  openImage(publication: any, type: String) {
    this.openPublication = null;
    if (type === 'image') {
      this.linkImage = publication.image.link_image;
    } else if (type === 'publication') {
      this.linkImage = publication.publication.image;
    }
    // let isStatus = this.isStatusButton(publication['likes'])
    // this.openPublication = publication;
    // this.openPublication['isStatus'] = isStatus;
    
  }

  isStatusButton(list: any) {
    return this.mediaService.isStatusButton(list, this.me);
  } 

  likeDislike(isStatus: Boolean) {
    if (!isStatus) {
      this.userService.likePublication(this.me, this.openPublication).subscribe(res => {
        // this.publication je metoda koju trebamo nadograditi kasnije
        this.editStatus(true);
      })
    } else {
      this.userService.dislikePublication(this.me, this.openPublication).subscribe(res => {
        this.editStatus(false);
      })
    }
    this.openPublication.isStatus = !this.openPublication.isStatus;
  }

  editStatus(type: Boolean) {
    if (type) {
      this.openPublication.likes.push(JSON.parse(localStorage.getItem('user'))._id);
    } else {
      this.openPublication.likes.splice(JSON.parse(localStorage.getItem('user'))._id, 1);
    }
  }
}
