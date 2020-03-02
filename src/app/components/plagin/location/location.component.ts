import { Component, OnInit, Input } from '@angular/core';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import Overlay from 'ol/Overlay';
import { GeolocationService } from '../../../services/geolocation.service';
import { Global } from '../../../global/global';
import { timer } from 'rxjs';
import { NotifierService } from 'angular-notifier';

import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  private readonly notifier: NotifierService;
  @Input() typeLocation: any;
  @Input() user: any;

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView
  overLayer: Overlay;

  cordinates: any;
  address: any;
  me: any;
  statusSave: Boolean;
  radi: Boolean;
  constructor(notifier: NotifierService, private geolocationService: GeolocationService, private global: Global) {
    this.address = null;
    this.notifier = notifier;
    this.me = JSON.parse(localStorage.getItem('user'));
    this.statusSave = true;
    this.radi = false;
  }

  /**
   * Startovanje aplikacije
   */
  ngOnInit() {

    /**
     * moracemo srediti socket u ovoj metodi
     * autoPublication-_id je metoda koja treba da dodje kada se promjeni nesto
     * i kreira se nova publication
     */


    console.info('LocationComponetn - Init geolocation of users');
    this.statusSave = (this.user._id.toString() === this.me._id.toString());
    if (this.statusSave) {
      // Posto lokaciju poziva vise komponenti,
      // U zavisnosti od date kompoenente odredjene funkcije se okidaju
      if (this.typeLocation === 'userProfile') {
        this.getLocationInLocastorage('local');
      } else if (this.typeLocation === 'startLocation') {
        this.geolocationService.startAutomationChangeLocation();
        this.getLocationInLocastorage('local');
      }
    } else {
      console.log(this.user.otherInformation.adress)
      // Prvi slucaj nema kordinate
      if (this.user.otherInformation.adress.corrdinate) {
        this.cordinates = this.user.otherInformation.adress.corrdinate;
        this.openMapFriend();
      } else {
        this.notifier.notify('info', 'Korisnik jos nije dodao lokaciju')
      }
      // Drugi slucaj ima kordinate
    }
  }

  getCordinate() {
    navigator.geolocation.getCurrentPosition(res => {
      console.log(res)
      this.cordinates = res.coords;
      this.cordinates.type = 'client';
      this.geolocationService.setNewLocationServer(this.cordinates);
      this.openMap(true);
    }, err => {
      if (err.code === 1) {
        console.log(err)
        this.notifier.notify( 'warning', 'Lokacija je iskljucena na ovom uredjaju')
        this.getLocationInLocastorage('server');
      }
    })
  }

  getLocationInLocastorage(type: String) {
    if (type === 'local') {
      if (this.global.isChangeLocation()) {
        this.address = this.geolocationService.getInLocalStorage().address;
        this.cordinates = this.geolocationService.getInLocalStorage().cordinates;
        console.log(this.cordinates.latitude)
        this.openMap(false); 
      } else {
        this.getCordinate();
      }
    } else if (type === 'server') {
      let cordinates = this.geolocationService.getUser().otherInformation.adress.corrdinate;
      if (cordinates) {
        this.cordinates = cordinates;
        this.cordinates.type = 'server'
        this.openMap(true)
      } else {
        this.notifier.notify('info', 'Molimo vas da postavite addresu kako bi vas ljudi videli')
      }
    }
  }

  openMap(isAddress: Boolean) {
    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source,
      stopEvent: false,
    });
    
    this.view = new OlView({
      center: fromLonLat([this.cordinates.longitude, this.cordinates.latitude]),
      zoom: 15
    });
    
    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });
    this.map.overlayContainerStopEvent_.style.removeProperty('position');

    if (isAddress) {
      this.getAddress(true)
    } else {
      this.geolocationService.startAutomationChangeLocation();
    }
  }

  openMapFriend() {
    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source,
      stopEvent: false,
    });
    
    this.view = new OlView({
      center: fromLonLat([this.cordinates.longitude, this.cordinates.latitude]),
      zoom: 15
    });
    
    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });
    this.map.overlayContainerStopEvent_.style.removeProperty('position');

    this.getAddress(false)
  }

  getAddress(isSave: Boolean) {
    let nest = this.geolocationService.getAddressWithCorrdinates([this.cordinates.longitude, this.cordinates.latitude]);
    let that = this;
    nest.then(address => {
      this.address = address;
      if (isSave) {
        this.geolocationService.setInLocalStorage(address, that.cordinates);
      }
    })
  }

  destroy() {
    this.source = null;
    this.layer = null;
    this.view = null;
    this.map = null;
  }
}
