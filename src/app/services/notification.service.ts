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
}
