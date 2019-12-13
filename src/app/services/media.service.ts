import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError  } from 'rxjs/operators';
import { Global } from '../global/global';

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
}
