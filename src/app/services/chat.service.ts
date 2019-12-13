import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError  } from 'rxjs/operators';
import { Global } from '../global/global';
import { Online } from '../models/online';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient, private global: Global) { }

  getChatByUser(_id: String) {
    return this.http.get(this.global.getChat() + 'chats/' + _id)
      .pipe(map(res => {
        return res;
      }))
  }

  setChat(item: Online) {
    return this.http.post(this.global.getChat() + 'chats/', item)
      .pipe(map(res => {
        return res;
      }))
  }

  pushMessage(chat: any, message: any) {
    console.log(chat)
    return this.http.post(this.global.getChat() + 'chats/push', {chat: chat, message: message})
      .pipe(map(res => {
        return res;
      }))
  }
}
