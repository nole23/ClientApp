import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError  } from 'rxjs/operators';
import { Global } from '../global/global';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private global: Global, private http: HttpClient) { }

  setNewLocation(newPublicaton: any) {
    return this.http.post(this.global.linkLocalhost + 'publication/location', newPublicaton)
      .pipe(map(res => {
        return res;
      }))
  }

  deletePublicaton(item: any) {
    return this.http.delete('http://localhost:8080/api/publication/' + item._id)
      .pipe(map(res => {
        return res;
      }))
  }

  publicAgain(item: any) {
    return this.http.put('http://localhost:8080/api/publication/public-again/' + item._id, {})
      .pipe(map(res => {
        return res;
      }))
  }
}
