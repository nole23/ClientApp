import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Global } from '../global/global';
import { User } from '../models/user';
import { UserInformation } from '../models/user-information';

interface IPInfo {
	latitude: string;
	longitude: string;
	country_name: string;
	city: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private global: Global,
    private http: HttpClient,
    private router: Router
  ) { }

  login(user: User) {
    return this.http.post(this.global.getLink() + 'authentation/sing-in', {user: user})
    .pipe(map(res => {
      if (this.global.getResponseError(res['message'])) {
        localStorage.setItem('user', JSON.stringify(res['message']['user']));
        localStorage.setItem('token', JSON.stringify(res['message']['token']));
        localStorage.setItem('options', JSON.stringify(res['message']['defaultOptions']))
        
        let notification = res['message']['statusNotification'];
        notification.chat = [];
        localStorage.setItem('notification', JSON.stringify(notification))
        return {message: 'SUCCESS_USER_IS_LOGIN', user: res['message']['user']};
      } else {
        return {message: res['message']};
      }
    }))
  }

  registration(user: User, userInformation: UserInformation, userLang: String, iPInfo: any) {
    let data = {
      user: user,
      userInformation: userInformation,
      userLang: userLang,
      iPInfo: iPInfo
    }

    return this.http.post(this.global.getLink() + 'authentation/sing-up', data)
    .pipe(map(res => {
      if (this.global.getResponseError(res['message'])) {
        return {message: 'SUCCESS'};
      } else {
        return {message: res['message']};
      }
    }))
  }

  getIPInfo() {
    return this.http.get<IPInfo>("https://ipapi.co/json/")
  }

  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('address');
    localStorage.removeItem('options');
    localStorage.removeItem('notification');
    localStorage.removeItem('restartEmail');

    this.global.ngLogOut();
    this.router.navigate(['/']);
  }
}
