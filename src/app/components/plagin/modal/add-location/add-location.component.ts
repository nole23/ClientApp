import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import Overlay from 'ol/Overlay';
import { fromLonLat } from 'ol/proj';
import { NotifierService } from 'angular-notifier';
import { GeolocationService } from '../../../../services/geolocation.service';
import { PublicationService } from '../../../../services/publication.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {

  private readonly notifier: NotifierService;

  map1: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView
  overLayer: Overlay;

  cordinates: any;
  address: any;
  message: String;
  text: String;
  isLocation: Boolean;
  constructor(
    public dialogRef: MatDialogRef<AddLocationComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      notifier: NotifierService,
      private geolocationService: GeolocationService,
      private publicationService: PublicationService
  ) { 
    this.notifier = notifier;
    this.address = null;
    this.text = null;
    this.isLocation = true;
  }

  ngOnInit() {
    this.getNewCordinate();
  }

  getNewCordinate() {
    navigator.geolocation.getCurrentPosition(res => {
      this.cordinates = res.coords;
      this.openMap();
    }, err => {
      if (err.code === 1) {
        this.isLocation = false;
      }
    })
  }

  openMap() {
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
    
    this.map1 = new OlMap({
      target: 'map1',
      layers: [this.layer],
      view: this.view
    });
    this.map1.overlayContainerStopEvent_.style.removeProperty('position');
    let address = this.geolocationService.getAddressWithCorrdinates([this.cordinates.longitude, this.cordinates.latitude]);

    let that = this;
    address.then(ress => {
      that.address = ress
    })
  }

  closeModal(message: any = null) {
    this.dialogRef.close(message);
  }

  saveLocation() {
    let data = {
      address: this.address,
      message: this.text,
      friends: []
    }
    this.publicationService.setNewLocation(data).subscribe(res =>{
      this.notifier.notify( 'success', 'Uspjesno ste dodali lokaciju');
      this.closeModal(res);
    }, err => {
      this.notifier.notify( 'warning', 'Niste uspjeli da dodate lokaciju')
    })
  }
}
