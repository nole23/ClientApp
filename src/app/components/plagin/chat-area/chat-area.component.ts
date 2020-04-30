import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { Global } from '../../../global/global';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.css']
})
export class ChatAreaComponent implements OnInit {
  @Input('item') item: any;
  @ViewChild('friendMessage') friendMessage: ElementRef;
  @ViewChild('meMessage') meMessage: ElementRef;

  isTopFriend: Boolean;
  isTopMe: Boolean;
  isText: Boolean;
  count = 0;
  constructor(
    private global: Global,
    private domSanitizer: DomSanitizer,
    private chatService: ChatService
  ) {
    this.isTopFriend = true;
    this.isTopMe = true;
    this.isText = true;
  }

  ngOnInit() {
  }

  changeText(item: any) {
    item['text'] = this.global.ngReplice(item['text'], item['isBgs']);
    return item['text']
  }

  ngShowInfoMessage(i: any) {
    let marginLeft = 
      this.friendMessage.nativeElement.children['friend-message-' + i]
      .querySelector('#message-item').offsetWidth + 5;

    let item = this.friendMessage.nativeElement.children['friend-message-' + i]
      .querySelector('#message-informatiin');
    
    item.classList.remove('hide');
    item.style.marginLeft = marginLeft + 'px';
  }

  ngHideInfoMessage(i: any) {
    let item = this.friendMessage.nativeElement.children['friend-message-' + i]
      .querySelector('#message-informatiin');
    
    item.classList.add('hide');
  }

  ngShowInfoMessageMe(i: any) {
    let item = this.meMessage.nativeElement.children['me-message-' + i]
      .querySelector('#message-informatiin');
    
    let button = this.meMessage.nativeElement.children['me-message-' + i]
      .querySelector('#message-button');
    
    button.classList.remove('hide')
    
    item.classList.remove('hide');
  }

  ngHideInfoMessageMe(i: any) {
    let item = this.meMessage.nativeElement.children['me-message-' + i]
      .querySelector('#message-informatiin');
  
    let button = this.meMessage.nativeElement.children['me-message-' + i]
      .querySelector('#message-button');
    
    button.classList.add('hide')
    item.classList.add('hide');
  }

  removeSendMessage(message: any) {
    this.chatService.removeOneMessage(message._id).subscribe(res => {
      if (res['message']) {
        let index = this.item.message.indexOf(message);
        this.item.message.splice(index, 1)
        console.log(this.item)
      }
    })
  }
}
