import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  @Input() item: any;
  @Input() user: any;
  showerChat: String;
  addComment: String;
  imageLink: String;
  constructor(private userService: UserService) { 
    this.showerChat = 'hide';
    this.addComment = null;
    this.imageLink = null;
  }

  ngOnInit() {
    console.info('ProfileComponent.ngOnInit() - Data initialization');
  }

  openComentar() {
    console.info('ProfileComponent.openComentar() - Show and open component');
    if (this.showerChat === 'hide') {
      this.showerChat = 'show';
    } else {
      this.showerChat = 'hide';
    }
  }

  sendMessage(event: any, item: any) {
    console.info('ProfileComponent.sendMessage() - Add comment to publication');
    if (event.keyCode === 13) {
      let comments = {
        user: this.user,
        dateOfComments: Date(),
        text: this.addComment
      }
      this.userService.addComment(this.item, comments).subscribe(res => {

        item.comments.push(comments);
        this.addComment = null;
      })
      
    }
  }

  likePublication() {
    console.info('ProfileComponent.likePublication() - Click like/dislike in publication');
    this.userService.likePublication(this.user, this.item).subscribe(res => {
      this.item.likes.push(this.user._id);
    })
  }

  disLikePublication() {
    console.info('ProfileComponent.likePublication() - Click like/dislike in publication');
    this.userService.dislikePublication(this.user, this.item).subscribe(res => {
      this.item.likes.splice(this.user._id, 1);
    })
  }

  openImage(link: String) {
    console.info('ProfileComponent.openImage() - Open modal for image');
    this.imageLink = link;
  }

  isStatusButton(list: any) {
    let status = false;

    list.forEach(element => {
      if (element === this.user._id) {
        status = true;
      }
    });
    return status;
  } 
}
