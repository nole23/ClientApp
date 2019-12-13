import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  @Input() imagesList: any;
  linkImage: String;
  constructor() {
    this.linkImage = null;
  }

  ngOnInit() {
  }

  openImage(link: String) {
    this.linkImage = link;
  }

  closeModal() {
    console.info('ProfileComponent.closeModal() - push button and close image in modal');
    if (this.linkImage !== null) {
      this.linkImage = null;
    }
  }
}
