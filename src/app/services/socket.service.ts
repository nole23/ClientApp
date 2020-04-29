import { Component, OnInit } from "@angular/core";
import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError  } from 'rxjs/operators';
import { Global } from '../global/global';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: any;
  socketMessage: any;
  me: any;
  constructor(
    private http: HttpClient, 
    private global: Global
  ) {
  }

  setSocket() {
    this.socket = io(this.global.getLinkClient());
  }

  emitStatusOnline() {
    this.socket.emit('setOnline', localStorage.getItem('user'));
  }

  emitTyping(chater: any, user: any) {
    this.socket.emit('typing', {chater: chater._id, user: user});
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
        return res
      }))
  }

  setSocketLink() {
    this.me = JSON.parse(localStorage.getItem('user'));

    this.socket.on('typing-' + this.me._id, (data: any) =>{
      this.global.getSocketFromCommponent('chat', 'typing', data);
    });

    this.socket.on('new-message-' + this.me._id, (data: any) =>{
      let resData = JSON.parse(data);
      if (resData.message.author.toString() !== this.me._id.toString()) {
        this.global.getSocketFromCommponent('chat', 'newNessage', resData);
        this.global.playAudi();
      }
    });
    
    this.socket.on('user-is-online-' + this.me._id, (data: any) => {
      this.global.getSocketFromCommponent('chat', 'userIsOnline', data);
    })

    this.socket.on('new-relationship-' + this.me._id, (data: any) => {
      console.log('new-relationshop')
      this.global.setNewNotification(data, 'Requester');
    })

    this.socket.on('new-notification-' + this.me._id, (data: any) => {
      console.log('new-notification')
      let jsonData = JSON.parse(data)
      this.global.setNewNotification(jsonData.user, jsonData.type);
      // this.global.getSocketFromCommponent('app', 'newNotification', data);
    })

    this.socket.on('show-message-' + this.me._id, (data: any) => {
      this.global.getSocketFromCommponent('chat', 'showMessage', data);
    })
  }

  disconnect() {
    // this.socket.disconnect();
    // this.setSocket();
    // this.emitStatusOnline()
  }
}
