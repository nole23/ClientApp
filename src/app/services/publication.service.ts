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
    return this.http.post(/*this.global.linkLocalhost + */'http://localhost:8080/api/publication/location', newPublicaton)
      .pipe(map(res => {
        return res;
      }))
  }
}
