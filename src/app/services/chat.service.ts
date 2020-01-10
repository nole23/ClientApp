import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  setChat(item: Online, lastElement: any) {
    
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
      })
    };
    return this.http.post(this.global.getChat() + 'chats/', {body: item, lastElement: lastElement})
      .pipe(map(res => {
        return res;
      }))
  }
  pushMessage(chat: any, message: any) {
    return this.http.post(this.global.getChat() + 'chats/push', {chat: chat, message: message})
      .pipe(map(res => {
        return res;
      }))
  }

  getMessagesStatus(user: any) {
    return this.http.post(this.global.getChat() + 'chats/get-status', user)
      .pipe(map(res => {
        return res;
      }))
  }

  removeMessageStatus(user: any) {
    console.log(user)
    return this.http.get(this.global.getChat() + 'chats/remove-status/' + user)
      .pipe(map(res => {
        return res;
      }))
  }
}
