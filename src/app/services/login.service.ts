import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
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
    private http: HttpClient
  ) { }

  login(user: User) {
    return this.http.post(this.global.getLink() + 'authentation/sing-in', {user: user})
    .pipe(map(res => {
      if (this.global.getResponse(res['message'])) {
        localStorage.setItem('user', JSON.stringify(res['message']['user']));
        localStorage.setItem('token', JSON.stringify(res['message']['token']));
        localStorage.setItem('options', JSON.stringify(res['message']['defaultOptions']))
        return {message: 'SUCCESS'};
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
      if (this.global.getResponse(res['message'])) {
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
    // return this.http.get(this.global.getLinkStatus() + 'status/logout')
    //   .pipe(map(res => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('address');
    localStorage.removeItem('options');
    //     return res;
    // }))
  }
}