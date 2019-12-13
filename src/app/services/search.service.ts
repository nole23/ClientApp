import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError  } from 'rxjs/operators';
import { Global } from '../global/global';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private global: Global, private http: HttpClient) { }

  getOtherUser() {
    return this.http.get(this.global.getLink() + 'users/all-other/0')
    .pipe(map(res => {
      return res;
    }))
  }

  searchUsers(text: String) {
    return this.http.get(this.global.getLink() + 'users/search/' + text)
    .pipe(map(res =>{
      return res;
    }))
  }
}
