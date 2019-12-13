import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  public getToken(): string {

    const token = JSON.parse(localStorage.getItem('token'));
    if (token !== null) {
      return token;
    }
    return null;
  }
}
