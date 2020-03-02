import { Component, OnInit, Input } from '@angular/core';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import Overlay from 'ol/Overlay';

import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-get-location',
  templateUrl: './get-location.component.html',
  styleUrls: ['./get-location.component.css']
})
export class GetLocationComponent implements OnInit {

  @Input() cordinates: any;

  mapMe: OlMap;
  getSource: OlXYZ;
  getLayer: OlTileLayer;
  getView: OlView
  getOverLayer: Overlay;
  constructor() { }

  ngOnInit() {
    console.log(this.cordinates)
    this.openMap();

  }

  openMap() {
    this.getSource = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.getLayer = new OlTileLayer({
      source: this.getSource,
      stopEvent: false,
    });
    
    this.getView = new OlView({
      center: fromLonLat([45.258722299999995,19.814681699999998]),
      zoom: 15
    });
    
    this.mapMe = new OlMap({
      target: 'map',
      layers: [this.getLayer],
      view: this.getView
    });
    console.log(this.mapMe)
  }

}
