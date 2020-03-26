import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError  } from 'rxjs/operators';
import { Global } from '../global/global';
import { timer } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { LocationComponent } from '../components/plagin/location/location.component';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private readonly notifier: NotifierService;
  private readonly locationComponent: LocationComponent;

  abc: any;
  constructor(notifier: NotifierService, private global: Global, private http: HttpClient) {
    this.notifier = notifier;
  }

  getAddressWithCorrdinates(cordinates: any) {


    const headerDict = {
      'Content-Type':  'application/json',
        'Access-Control-Allow-Credentials' : 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };
    return fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + cordinates[0] + '&lat=' + cordinates[1])
      .then(res => {
        return res.json();
      })
  }

  /**
   * Mi smo setovali adresu i kordinate u localstorage nase applikacije
   * i javili smo globalnoj varijabli da su postavljene nove vrijednosti
   */
  setInLocalStorage(address: any, cordinates: any) {
    let setAddress = {
      address: address,
      cordinates: {
        latitude: cordinates.latitude,
        longitude: cordinates.longitude,
        accuracy: cordinates.accuracy,
        type: !cordinates.type ? 'client' : cordinates.type
      }
    }
    localStorage.setItem('address', JSON.stringify(setAddress));
    this.startAutomationChangeLocation();
  }

  startAutomationChangeLocation() {

    if (this.global.isAutoLocationStart()) this.abc.unsubscribe();
    this.global.isSetAutoLocationStart(true);
    let that = this;

    return navigator.geolocation.getCurrentPosition(res => {

      let oldGeolocation = that.geolocation();
      if (oldGeolocation.cordinates.latitude.toFixed(3) === res.coords.latitude.toFixed(3)) {
          const source = timer(36000000, 2000);
          that.abc = source.subscribe(val => {
              that.startAutomationChangeLocation();
          });
      } else {
        let address = this.getAddressWithCorrdinates([res.coords.longitude, res.coords.latitude]);

        address.then(adr => {
          this.setNewLocationServer(res.coords);
          this.setInLocalStorage(adr, res.coords);
        })

      }
    }, err => {
      this.notifier.notify('info', 'Ukljucite lokaciju i vidite prijatelje iz okoline')
      return false;
    });
  }

  geolocation() {
    if (this.abc) this.abc.unsubscribe();
    return JSON.parse(localStorage.getItem('address'));
  }

  getInLocalStorage() {
    return JSON.parse(localStorage.getItem('address'));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  setNewLocationServer(corrdinate: any) {
    var geocordinate = {
      latitude: corrdinate.latitude,
      longitude: corrdinate.longitude,
      accuracy: corrdinate.accuracy
    }
    this.http.post(this.global.getLink() + 'geolocation/', geocordinate)
      .subscribe(res => {
        // console.log(res)
      }, err => {
        // console.log(err)
      })
  }
}
