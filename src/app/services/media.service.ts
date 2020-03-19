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

  addPicture(fd: any, name: String, data: any) {
    return this.http.post(/*this.global.getMediaLink() + */'http://localhost:8081/api/media/profile-picture/' + name, fd)
      .pipe(map(res => {
        return res;
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
