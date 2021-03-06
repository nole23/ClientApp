import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError  } from 'rxjs/operators';
import { Global } from '../global/global';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private global: Global, private http: HttpClient) { }

  getAllNotification(page: any) {
    let params = new HttpParams().set(
      "page", JSON.stringify(page)
    ).append(
      "type", JSON.stringify('publication')
    )
    return this.http.get(this.global.getLink() + 'notification/', {params: params})
      .pipe(map(res => {
        return res;
      }))
  }

  getAllVisitors(page: any) {
    let params = new HttpParams().set(
      "page", JSON.stringify(page)
    ).append(
      "type", JSON.stringify('visitors')
    )
    return this.http.get(this.global.getLink() + 'notification/', {params: params})
      .pipe(map(res =>{
        return res;
      }))
  }

  getAllRelationship(page: any) {
    let params = new HttpParams().set(
      "page", JSON.stringify(page)
    ).append(
      "type", JSON.stringify('relationship')
    )
    return this.http.get(this.global.getLink() + 'notification/', {params: params})
      .pipe(map(res =>{
        if (this.global.getResponseError(res['message'])) {
          this.global.editViewNotification('Requester');
          return {message: res['message']}
        } else {
          return {message: []}
        }
      }))
  }

  setShowNotification(type: String) {
    return this.http.put(this.global.getLink() + 'notification/' + type, {type: type})
      .pipe(map(res =>{
        if (this.global.getResponseSuccess(res['message'])) {
          return true;
        } else {
          return false;
        }
      }))
  }

  setShowFriendProfile(user: any) {
    let object = {
      friends: user,
      type: 'visitor',
      publication: null,
      cordinate: null,
      image: null
    }
    this.http.post(this.global.getLink() + 'notification/', object).subscribe(res => {
      console.info(res)
    })
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
