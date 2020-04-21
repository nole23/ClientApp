import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError  } from 'rxjs/operators';
import { Global } from '../global/global';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private global: Global, private http: HttpClient) { }

  getOtherUser(page: any) {
    return this.http.get(this.global.getLink() + 'users/all-other/' + page)
    .pipe(map(res => {
      if (this.global.getResponseError(res['message'])) {
        return {message: res['message']}
      }
      return {message: []};
    }))
  }

  searchUsers(text: String) {
    return this.http.get(this.global.getLink() + 'users/search/' + text)
    .pipe(map(res =>{
      return res;
    }))
  }
}
