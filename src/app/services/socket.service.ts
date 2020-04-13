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
  constructor(private http: HttpClient, private global: Global) { }

  setupSocketConnectionMessage() {
    this.socketMessage = io('http://localhost:8084');
  }

  setupSocketConnection() {
    this.socket = io('http://localhost:8082');
    if (JSON.parse(localStorage.getItem('user'))) {
      this.emitStatusOnline();
    }
  }

  emitStatusOnline() {
    this.socket.emit('setOnline', localStorage.getItem('user'));
  }

  emitTyping(chater: any, user: any) {
    this.socketMessage.emit('typing', {chater: chater._id, user: user._id});
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

    return this.http.get(/*this.global.getLink() + */ 'http://localhost:8082/api/status/', {params: params})
      .pipe(map(res => {
        return res
      }))
  }
}
