import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotLoginGuard implements CanActivate {
  
  constructor() {}

    canActivate() {
        if(localStorage.getItem('token')) {
            return false;
        }
        return true;
    }
}
