import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import Overlay from 'ol/Overlay';
import { NotifierService } from 'angular-notifier';
import { GeolocationService } from '../../../../services/geolocation.service';
import { NotificationService } from '../../../../services/notification.service';

import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-locat-me',
  templateUrl: './locat-me.component.html',
  styleUrls: ['./locat-me.component.css']
})
export class LocatMeComponent implements OnInit {
  private readonly notifier: NotifierService;
  @Output() voted = new EventEmitter<any>();
  @Input() click : Boolean;

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView
  overLayer: Overlay;

  cordinates: any;
  address: any;
  message: String;
  constructor(
      notifier: NotifierService,
      private geolocationService: GeolocationService,
      private notificationService: NotificationService) { 
    this.notifier = notifier;
    this.address = null;
  }

  ngOnInit() {
    this.getCordinate();
  }

  getCordinate() {
    console.log('dosao ovde')
    navigator.geolocation.getCurrentPosition(res => {
      this.cordinates = res.coords;
      this.getAddress();
    }, err => {
      if (err.code === 1) {
        if (this.notificationService.isNotification('warning', 'locatOFF')) {
          this.notificationService.saveNotification('warning', 'locatOFF')
          this.notifier.notify( 'warning', 'Lokacija je iskljucena na ovom uredjaju 2')
        }
      }
    })
  }

  getAddress() {
    let nest = this.geolocationService.getAddressWithCorrdinates([this.cordinates.longitude, this.cordinates.latitude]);
    let that = this;
    nest.then(address => {
      this.address = address;
      let newSave = {
        message: this.message,
        address: address
      };

      this.voted.emit(newSave);
    })
  }

}
