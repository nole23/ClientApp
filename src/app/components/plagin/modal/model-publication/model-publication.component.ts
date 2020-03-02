import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-model-publication',
  templateUrl: './model-publication.component.html',
  styleUrls: ['./model-publication.component.css']
})
export class ModelPublicationComponent implements OnInit {
  @Input() imageLink: any;
  @ViewChild('myimage') myimage: ElementRef;

  imgLink: any;
  constructor() { 
    this.imgLink = null;
  }

  ngOnInit() {
    console.log('upada li ovo vise puta')
    this.destroy();
    // this.imgLink = this.imageLink
  }

  destroy() {
    const image = this.myimage.nativeElement;
    // const spiner = this.prod.nativeElement.querySelector('img');
    console.log(image.children[0].querySelector('img'))
    if (image.children[0].querySelector('img') !== null) {
      console.log('upao ovde ima slika')
    } else {
      image.children[0].insertAdjacentHTML('beforeend', '<img src="' + this.imageLink.image + '" style="width: 100%; height: 100%;">')
    }
  }

  getAttribute() {
    this.imgLink = this.imageLink;
  }

}
