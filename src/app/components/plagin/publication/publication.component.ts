import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import Overlay from 'ol/Overlay';

import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  @ViewChild('myimage') myimage: ElementRef;
  @Output() imageEmiter = new EventEmitter<any>()
  @Input() item: any;
  @Input() user: any;

  mapMe: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView
  overLayer: Overlay;


  showerChat: String;
  addComment: String;
  imageLink: String;
  me: User;
  test: Boolean;
  constructor(private userService: UserService) { 
    this.showerChat = 'hide';
    this.addComment = null;
    this.imageLink = null;
    this.me = JSON.parse(localStorage.getItem('user'));
    this.test = false;
  }

  ngOnInit() {
    console.info('ProfileComponent.ngOnInit() - Data initialization');
  }

  openComentar() {
    console.info('ProfileComponent.openComentar() - Show and open component');
    if (this.showerChat === 'hide') {
      this.showerChat = 'show';
    } else {
      this.showerChat = 'hide';
    }
  }

  sendMessage(event: any, item: any) {
    console.info('ProfileComponent.sendMessage() - Add comment to publication');
    if (event.keyCode === 13) {
      let comments = {
        user: this.user,
        dateOfComments: Date(),
        text: this.addComment
      }
      this.userService.addComment(this.item, comments).subscribe(res => {

        item.comments.push(comments);
        this.addComment = null;
      })
      
    }
  }

  likePublication() {
    console.info('ProfileComponent.likePublication() - Click like/dislike in publication');
    this.userService.likePublication(this.user, this.item).subscribe(res => {
      console.log(res)
      this.item.likes.push(this.user._id);
    })
  }

  disLikePublication() {
    console.info('ProfileComponent.likePublication() - Click like/dislike in publication');
    this.userService.dislikePublication(this.user, this.item).subscribe(res => {
      console.log(res)
      this.item.likes.splice(this.user._id, 1);
    })
  }

  closeModal() {
    console.log('dosao')
    this.imageLink = null;
  }

  openImage(link: String) {
    console.info('ProfileComponent.openImage() - Open modal for image');

    this.imageLink = link;
    let isStatus = this.isStatusButton(this.imageLink['likes'])
    this.imageLink['isStatus'] = isStatus;

    this.imageEmiter.emit(this.imageLink);
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
      center: fromLonLat([45.258722299999995,19.814681699999998]),
      zoom: 15
    });
    
    this.mapMe = new OlMap({
      target: 'mapMe',
      layers: [this.layer],
      view: this.view
    });
    console.log(this.mapMe)
  }

  isStatusButton(list: any) {
    let status = false;

    list.forEach(element => {
      if (element === this.me._id) {
        status = true;
      }
    });
    return status;
  } 
}
