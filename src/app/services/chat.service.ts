import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError  } from 'rxjs/operators';
import { Global } from '../global/global';
import { Online } from '../models/online';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  listChater: any;
  constructor(private http: HttpClient, private global: Global) {
    this.listChater = null;
  }

  getAllChater() {
    return this.http.get(this.global.getChat() + 'chats/')
    .pipe(map(res => {
      if (this.global.getResponseError(res['message'])) {
        this.listChater = res['message'];
        return {message: this.listChater};
      } else {
        return {message: []}
      }
    }))
  }

  shetNotShowMessage(chat: any, isType: Boolean) {
    return this.http.put(this.global.getChat() + 'chats/', {chat: chat, isType: isType})
      .pipe(map(res => {
        if (this.global.getResponseSuccess(res['message'])) {
          return true;
        } else {
          return false;
        }
      }))
  }

  removeMesssage(chat: any) {
    return this.http.delete(this.global.getChat() + 'chats/', chat)
      .pipe(map(res => {
        return res;
      }))
  }

  getAllMessageOneChat(item: any, page: any) {
    let params = new HttpParams().set(
      "item", JSON.stringify(item)
    ).append(
      "page", JSON.stringify(page)
    )

    return this.http.get(this.global.getChat() + 'chats/' + item._id, {params: params})
      .pipe(map(res => {
        if (!this.global.getResponse(res['message'])) {
          return {message: []};
        } else {
          return {message: res['message'], page: res['page']};
        }
      }))
  }

  sendMessage(chat: any, message: String) {
    return this.http.post(this.global.getChat() + 'chats/', {chat: chat, message: message})
      .pipe(map(res => {
        if (this.global.getResponseError(res['message'])) {
          return {message: true, data: res['message']}
        } else {
          return {message: false, data: null}
        }
      }))
  }

  removeOneMessage(id: any) {
    return this.http.delete(this.global.getChat() + 'chats/' + id)
      .pipe(map(res => {
        if (this.global.getResponseSuccess(res['message'])) {
          return {message: true};
        } else {
          return {message: false};
        }
      }))
  }

  getStatusOnline(listChater: any) {
    let listFriends = [];
    let onMe = JSON.parse(localStorage.getItem('user'));
    listChater.forEach((element: any) => {
      element.participants.forEach((friend: any) => {
        if (friend._id.toString() !== onMe._id.toString()) {
          listFriends.push({chater: element._id, friend: friend._id});
        }
      });
    });

    let params = new HttpParams().set(
      "item", JSON.stringify(listFriends)
    ).append(
      "me", JSON.stringify(onMe._id)
    )

    return this.http.get(this.global.getLinkStatus() + 'status/', {params: params})
      .pipe(map(res => {
        if (this.global.getResponseError(res['message'])) {

          if (this.listChater !== null) {
            for (let i = 0; i < this.listChater.length; i++) {
              let index = res['message'].find(x => x.chater.toString() === this.listChater[i]._id.toString());
              this.listChater[i].status = index.status;
            }
          }

          return true

        } else {
          return false;
        }
      }))
  }

  setNewChat(messageText: any, id: any) {
    
    let regExpLink = this.global.regExpLink(messageText);
    let regExpSmile = this.global.regExpSmile(messageText);
    let regExpYt = this.global.regExpYt(messageText);
    let regExpImg = this.global.regExpImg(messageText);

    let text = ''
    let linkText = ''
    let isBgs = false;
    let isBottom = false;

    if (regExpLink) {
      if (regExpYt) {
        if (regExpYt['index'] === 0) {
          text = this.global.setChatWithoutText(regExpYt[0]);
          isBgs = true;
        } else {
          text = this.global.setChatWithText(
            messageText.slice(0,regExpYt['index']),
            regExpYt[0]
          );
          isBgs = true; 
        }

        linkText = this.global.setYtText(regExpYt[0])
      } else if (regExpImg) {
        
        if (regExpImg['index'] === 0) {
          text = this.global.setChatWithoutText(regExpImg[0]);
          isBgs = true;
        } else {
          text = this.global.setChatWithText(
            messageText.slice(0,regExpImg['index']),
            regExpImg[0]
          );
          isBgs = true; 
        }

        linkText = this.global.setImageText(regExpImg[0])

      } else {
        if (regExpLink['index'] === 0) {
          text = this.global.setChatWithoutText(regExpLink[0]);
          isBgs = true;
          linkText = null;
        } else {
          text = this.global.setChatWithText(
            messageText.slice(0,regExpLink['index']),
            regExpLink[0]
          );
          isBgs = true;
          linkText = null;
        }
      }
    } else if (regExpSmile) {
      if (regExpSmile['index'] === 0) {
        linkText = null;
        text = messageText;
        isBgs = false;
      } else {
        linkText = null;
        text = messageText;
        isBgs = true;
      }
    } else {
      linkText = null;
      text = messageText;
      isBgs = true;
    }

    let textSave = {
      _id: id,
      text: text,
      dateOfCreate: new Date,
      isBgs: isBgs,
      isBottom: isBottom
    };

    let imgSave = {
      _id: id,
      text:  linkText,
      dateOfCreate: new Date,
      isBgs: false,
      isBottom: false
    }

    return {text: textSave, imgSave: imgSave, linkText: linkText !== null};
  }

  getListChater() {
    if (this.listChater === null) {
      return []
    } else {
      return this.listChater
    }
  }

  setOnlineUser(data: any) {
    if (this.listChater !== null) {
      for (let i = 0; i < this.listChater.length; i++) {
        let index = this.listChater[i].participants.findIndex(x => x._id.toString() === data.user._id.toString());
        if (index !== -1) {
          this.listChater[i].status = data.status;
        }
      }
    }
  }
}
