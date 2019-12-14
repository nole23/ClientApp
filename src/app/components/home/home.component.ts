import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as io from 'socket.io-client';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';
import { Online } from '../../models/online';
import { Global } from '../../global/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('list') list: ElementRef;
  private socket: any;

  listChatFriends: [Online];
  chat: any;
  user: User;
  textChat: String;
  notChatText: String;
  indicator: Boolean;
  constructor(private userService: UserService, private chatService: ChatService, private global: Global) {
    this.socket = io('twoway-chatservice.herokuapp.com');
    this.chat = null;
    this.notChatText = 'Zapocnite chat';
    this.indicator = false;
  }

  ngOnInit() {
    console.info('ProfileComponent.ngOnInit() - Data initialization');
    // this._getAllChater();

    this.user = JSON.parse(localStorage.getItem('user'));
    var numberOfList = 20;
    this.userService.setOnline().subscribe((res: any) => {
      this.listChatFriends = res['message'];
      // this._getChatOneUser(this.listChatFriends[0]);
      numberOfList -= this.listChatFriends.length;
      this._getFriends(this.listChatFriends, numberOfList);
    }, (err: any) => {
      console.log(err)
    })

    // TODO socket
    // this.socket.on('chat-' + this.user._id, (data: any) => {
    //   if (this.chat !== null) {
    //     this.chat.chatBox.push(data['chatBoxResponse']);
    //   }
    //   this._setIndicator(data['chatBoxResponse'].text._id_sender.username, 'hide', 'show');
    // })

    // TODO dovesti one sa kojima smo pricali
  }

  _getFriends(listChat: any, numberOfList: number) {
    this.userService.getFriendsByLimit(listChat, numberOfList).subscribe(res => {
      console.log(res)
      this._editRes(res['users']);
    })
  }

  _editRes(res: any) {
    res.forEach(element => {
      var edit = new Online({user: element, device: []})
      this.listChatFriends.push(edit);
    });
  }


  _setIndicator(username: String, remove: String, add: String) {
    let list = this.list.nativeElement.children['list-user-' + username];
      if (list.children.length > 0) {
        list.children[1].classList.remove(remove);
        list.children[1].classList.add(add);
      }
  }

  _getChatOneUser(firstFriends: Online) {
    if (firstFriends) {
      this.notChatText = null;
      this.chatService.getChatByUser(firstFriends.user._id).subscribe(res => {
        console.log(res)
      })
    } else {
      this.notChatText = 'Zapocnite chat'
    }
    // this.chat = [{
    //   user: this.user,
    //   text: ['Prva poruka', 'Druga poruka malo duza', 'Treca poruka jos duza da vidimo sta ce biti']
    // }, {
    //   user: this.user,
    //   text: ['Odgovorio samo jednom']
    // }]
  }

  _getAllChater() {
    this.userService.getAllChater().subscribe((res: any) =>{
      this.listChatFriends = res;
    })
  }

  sendMessage(event: any) {
    if (event.keyCode == 13) {
      this._sendMessage();
    }
  }

  btnSendMessage() {
    this._sendMessage();
  }

  openUserForChat(item: Online) {
    this._setIndicator(item.user.username, 'show', 'hide');
    this.chatService.setChat(item).subscribe(res => {
      if (res['message'].chatBox.length === 0) {
        this.notChatText = null;
        this.chat = {
          _id: res['message']._id,
          listChater: res['message'].listChater,
          chatBox: []
        };
      } else {
        this.chat = {
          _id: res['message']._id,
          listChater: res['message'].listChater,
          chatBox: res['message'].chatBox
        }
        this.notChatText = null;
      }
    })
  }

  _sendMessage() {
    let myMessage = {
      user: this.user,
      text: this.textChat,
      media: null,
    }
    this.chatService.pushMessage(this.chat, myMessage).subscribe(res => {
      this.chat.chatBox.push(res['chatBoxResponse'])
      delete this.textChat;
    })
    // this.chat.push(myMessage);
    // delete this.textChat;
  }
}
