import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError  } from 'rxjs/operators';
import { Global } from '../global/global';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private global: Global, private http: HttpClient) { }

  getAllNotification() {
    return this.http.get(this.global.getLink() + 'notification/')
      .pipe(map(res => {
        return res;
      }))
  }

  saveNotification(type: String, method: String) {
    let notification = localStorage.getItem('notification');
    let isLocalstorage = notification ? true : false;
    
    let newNoti = {
      type: type,
      method: method,
      isCounter: this.isCounter(method)
    }
    // Ukoliko postoje notifikacije na serveru, provjeravamo da li ponovo da je okinemo
    // Postoje notifikacije koje mogu vise puta da se dese
    // Postoje one koje se smao jednom treba da dese i vise ne treba
    if (isLocalstorage) {
      let localNotification = JSON.parse(notification);
      
      let persons =  localNotification.find(x => x.method.toString() === newNoti.method.toString());
      localStorage.removeItem('notification');
      if (persons === undefined) localNotification.push(newNoti)
      localStorage.setItem('notification', JSON.stringify(localNotification));
    } else {
      var notify = [
          {
              type: type,
              method: method,
              isCounter: this.isCounter(method)
          }
      ]
      localStorage.setItem('notification', JSON.stringify(notify));
    }
  }

  isNotification(type: String, method: String) {
    let notifications = JSON.parse(localStorage.getItem('notification'));
    let status = false;
    if (notifications !== null) {
      notifications.forEach((element: any) => {
        if (element.method === method) {
          if (element.type === type) {
            status = false;
          } else {
            status = true;
          }
        } else {
          status = false;
        }
      });
    }
    return status;
  }

  isCounter(method: String) {
    if (method === 'locatOFF') return false;
  }
}
