import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError  } from 'rxjs/operators';
import { Global } from '../global/global';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private global: Global, private http: HttpClient) { }

  openSmile() {
    return this.http.get('http://localhost:8085/api/client/get-host')
      .pipe(map(res =>{
        return res;
      }))
  }
}
