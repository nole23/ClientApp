import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../../../models/user';
import { ChatService } from '../../../services/chat.service';
import { NotifierService } from 'angular-notifier';
import { Global } from '../../../global/global';

@Component({
  selector: 'app-list-users-chat',
  templateUrl: './list-users-chat.component.html',
  styleUrls: ['./list-users-chat.component.css']
})
export class ListUsersChatComponent implements OnInit {
  @Input() item: any;
  @Input() i: any;
  @Output() emit = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Input() events: Observable<void>;

  private readonly notifier: NotifierService;

  me: User;
  isFriends: Boolean;
  friends: User;
  isTrueMessage: Boolean;
  constructor(
    notifier: NotifierService,
    private chatService: ChatService,
    private global: Global
  ) {
    this.me = JSON.parse(localStorage.getItem('user'));
    this.isTrueMessage = true;
    this.notifier = notifier;
  }

  ngOnInit() {
    this.events.subscribe(() => {
      this.isTrueMessage = false;
    });
    this.editUserList();
  }

  editUserList() {
    if (this.item.participants.length === 2) {
      this.item.participants.forEach((element: any) => {
        if (element._id.toString() !== this.me._id.toString()) {
          this.friends = new User(element);
        }
      });
      if (this.item.message.length === undefined) {
        this.item.message.listViewUser.forEach(element => {
          if (element.toString() === this.me._id.toString()) {
            this.isTrueMessage = false;
          }  
        });
      } else {
        this.isTrueMessage = false;
      }
    } else {
      this.isFriends = true;
    }
  }

  removeChat() {
    this.chatService.removeMesssage(this.item).subscribe(res => {
      this.remove.emit({status: true, item: this.item});
    })
  }

  setNotShowMessage() {
    if (this.item.message.length === undefined) {
      this.chatService.shetNotShowMessage(this.item, this.isTrueMessage).subscribe(res => {
        if (res) {
          if (this.isTrueMessage) {
            this.item.message.listViewUser.push(this.me._id);
            this.isTrueMessage = !this.isTrueMessage;
          } else {
            let index = this.item.message.listViewUser.indexOf(this.me._id)
            this.item.message.listViewUser.splice(index, 1)
            this.isTrueMessage = !this.isTrueMessage;
          }
        } else {
          // notifikacije
          this.notifier.notify('warning', 'Server trenutno nije dostupan')
        }
      })
    }
  }

  openChat() {
    if (this.isTrueMessage) this.setNotShowMessage();
    this.emit.emit({item: this.item, i: this.i, status: true});
  }

  changeText(text: String) {
    return this.global.ngReplice(text, true);
  }
}
