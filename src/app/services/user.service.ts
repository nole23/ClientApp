import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError  } from 'rxjs/operators';
import { Global } from '../global/global';
import { User } from '../models/user';
import { UserInformation } from '../models/user-information';
import { Publication } from '../models/publication';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private global: Global, private http: HttpClient) { }

  login(user: User) {
    return this.http.post(this.global.getLink() + 'authentation/sing-in', {user: user}).pipe(map(res =>{
      localStorage.setItem('token', JSON.stringify(res['token']));
      localStorage.setItem('user', JSON.stringify(res['user']));
      return res['user'];
    }))
  }

  registration(user: User, userInformation: UserInformation) {
    return this.http.post(this.global.getLink() + 'authentation/sing-up', {user: user, userInformation: userInformation})
    .pipe(map(res => {
      console.log(res);

      return res;
    }))
  }

  restartPassword(user: User) {
    return this.http.put(this.global.getLink() + 'authentation/token-for-restart-passwrod', user)
    .pipe(map(res => {
      return res;
    }))
  }

  checkCode(code: any, email: any) {
    return this.http.get(this.global.getLink() + 'authentation/check-code/' + email + '/' + code)
    .pipe(map(res => {
      return res;
    }))
  }

  newPassword(passwrod: any, email: any, code: any) {
    return this.http.put(this.global.getLink() + 'authentation/retstr-passeord', {email: email, code: code, passwrod: passwrod})
    .pipe(map(res =>{
      return res;
    }))
  }

  getAllChater() {
    return this.http.get(this.global.getLink() + '')
    .pipe(map(res => {
      return res;
    }))
  }

  getUser(id: any) {
    return this.http.get(this.global.getLink() + 'users/' + id)
    .pipe(map(res =>{
      return res;
    }))
  }

  getPublication(user: User) {
    return this.http.get(this.global.getLink() + 'publication/' + user._id)
    .pipe(map(res =>{
      return res;
    }))
  }

  getFriends(user: User, pagination: any) {
    return this.http.get(this.global.getLink() + 'users/friends/' + user._id + '/' + pagination)
    .pipe(map(res => {
      return res;
    }))
  }

  sendRelationship(user: User) {
    return this.http.post(this.global.getLink() + 'relationships/', {user: user})
    .pipe(map(res => {
      return res;
    }))
  }

  removeRelationship(user: User) {
    return this.http.delete(this.global.getLink() + 'relationships/' + user._id)
    .pipe(map(res => {
      return res;
    }))
  }

  deleteFriends(user: User) {
    return this.http.delete(this.global.getLink() + 'users/' + user._id)
      .pipe(map(res => {
        return res;
      }))
  }

  acceptRelatuonship(user: User) {
    return this.http.put(this.global.getLink() + 'relationships/' + user._id, {})
    .pipe(map(res => {
      return res;
    }))
  }

  editGeneralData(data: any) {
    console.info('UserService.editGeneralData() - send date in server');
    return this.http.put(this.global.getLink() + 'users/', data)
      .pipe(map(res => {
        return res;
      }))
  }

  editAccount(data: any) {
    console.info('UserService.editGeneralData() - send date in server');
    return this.http.put(this.global.getLink() + 'users/password', data)
      .pipe(map(res => {
        return res;
      }))
  }

  editOtherInformation(data: any) {
    console.info('UserService.editOtherInformation() - send date in server');
    return this.http.put(this.global.getLink() + 'users/information', data)
      .pipe(map(res => {
        return res;
      }))
  }

  saveImageProfile(formData: any, name: any) {
    return this.http.post(this.global.getMediaLink() + 'media/' + name, formData)
      .pipe(map(res => {
        return res;
      }))
  }

  likePublication(user: User, publication: Publication) {
    return this.http.put(/*this.global.getLink() + */'http://localhost:8080/api/publication/', {user: user._id, publication: publication._id})
      .pipe(map(res => {
        return res;
      }))
  }

  dislikePublication(user: User, publication: Publication) {
    return this.http.put(/*this.global.getLink() + */'http://localhost:8080/api/publication/remove', {user: user._id, publication: publication._id})
      .pipe(map(res => {
        return res;
      }))
  }

  addComment(item: any, object: any) {
    return this.http.post(this.global.getLink() + 'publication/', {item: item, object: object})
      .pipe(map(res => {
        return res;
      }))
  }

  getFriendsByLimit(listChatFriends: any, numberOfList: number) {
    return this.http.post(this.global.getLink() + 'users/friends', {listOnlineFriends: listChatFriends, limit: numberOfList})
      .pipe(map(res => {
        return res;
      }))
  }

  setOnline() {
    return this.http.get(this.global.getLinkStatus() + 'status/')
      .pipe(map(res => {
        return res;
      }))
  }

  getPicture(user: User) {
    return [{img: ''}];
  }

  logout() {
    return this.http.get(this.global.getLinkStatus() + 'status/logout')
      .pipe(map(res => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return res;
    }))
  }
}
