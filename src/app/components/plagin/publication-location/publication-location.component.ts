import { Component, OnInit,Input } from '@angular/core';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import Overlay from 'ol/Overlay';
import {circular as circularPolygon} from 'ol/geom/Polygon';
import Feature from 'ol/Feature';
import { fromLonLat } from 'ol/proj';
import {Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';


@Component({
  selector: 'app-publication-location',
  templateUrl: './publication-location.component.html',
  styleUrls: ['./publication-location.component.css']
})
export class PublicationLocationComponent implements OnInit {
  @Input() cordinate: any;
  @Input() i: any;

  
  publicMap: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView
  overLayer: Overlay;
  vectorLayer: VectorLayer;
  cordinates: any;
  isSpiner: Boolean;
  constructor() {
    this.isSpiner = true;
  }

  ngOnInit() {
    setTimeout(() =>{
      this.openMap(this.i);
    }, 1000)
  }

  openMap(id: any) {
    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source,
      stopEvent: false,
    });

    this.view = new OlView({
      center: fromLonLat([this.cordinate.longitude, this.cordinate.latitude]),
      zoom: 15
    });

    this.vectorLayer = new VectorLayer({
      source: new VectorSource()
    });

    this.isSpiner = false;

    this.publicMap = new OlMap({
      target: 'publicMap' + id,
      layers: [this.layer, this.vectorLayer],
      view: this.view
    });

    var radius = 300;
    var circle4326 = circularPolygon([this.cordinate.longitude, this.cordinate.latitude], radius, 64);
    var circle3857 = circle4326.clone().transform('EPSG:4326', 'EPSG:3857');
    this.vectorLayer.getSource().addFeature(new Feature(circle3857));

    this.publicMap.overlayContainerStopEvent_.style.removeProperty('position');
  }
}
