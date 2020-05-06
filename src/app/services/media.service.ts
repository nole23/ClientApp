import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError  } from 'rxjs/operators';
import { Global } from '../global/global';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private global: Global, private http: HttpClient) { }

  getPicture(id: String) {
    return this.http.get(this.global.getMediaLink() + 'media/' + id)
      .pipe(map(res => {
        return res;
      }))
  }

  likeImage(data: any) {
    return this.http.put(this.global.getMediaLink() + 'media/like', data)
      .pipe(map(res => {
        return res;
      }))
  }

  dislikeImage(data: any) {
    return this.http.put(this.global.getMediaLink() + 'media/dislike', data)
      .pipe(map(res => {
        return res;
      }))
  }
// twoway-mediaservice.herokuapp.com
  addPicture(formData: any, name: String, data: any) {
    return this.http.post('https://twoway-mediaservice.herokuapp.com/api/media/profile-picture/' + name + '/' + data.text, formData)
      .pipe(map(res => {
        if (this.global.getResponseError(res['message'])) {
          return {message: res['message'], media: res['media']}
        } else {
          return {message: 'ERROR_NOT_SAVE_IMAGE'}
        }
      }))
  }

  saveImageProfile(formData: any, name: any) {
    return this.http.post('https://twoway-mediaservice.herokuapp.com/api/media/' + name, formData)
      .pipe(map(res => {
        if (this.global.getResponseError(res['message'])) {
          return {message: res['message']}
        } else {
          return {message: 'ERROR_NOT_SAVE_IMAGE'}
        }
      }))
  }

  isStatusButton(list: any, me: User) {
    let status = false;
    list.forEach((element: any) => {
      if (element === me._id) {
        status = true;
      }
    });
    return status;
  }
}