import { Component, OnInit, Input } from '@angular/core';
import { MediaService } from '../../../services/media.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  @Input() imagesList: any;
  linkImage: String;
  me: any;
  numberOfImage: any;
  isMe: Boolean;
  constructor(private mediaService: MediaService) {
    this.linkImage = null;
    this.me = JSON.parse(localStorage.getItem('user'));
    this.isMe = false;
  }

  ngOnInit() {
  }

  openImage(link: String, index: any) {

    this.numberOfImage = index;
    this.linkImage = link;

    let isStatus = this.isStatusButton(this.linkImage['link']['like'])
    this.linkImage['link']['isStatus'] = isStatus;    
  }

  closeModal() {
    console.info('ProfileComponent.closeModal() - push button and close image in modal');
    if (this.linkImage !== null) {
      this.linkImage = null;
    }
  }

  ngShift(type: String) {
    this.linkImage = null;
    if (type === 'left') {
      if (this.imagesList[(this.numberOfImage - 1).toString()] === undefined) {
        this.linkImage = this.imagesList[this.imagesList.length - 1];
        let isStatus = this.isStatusButton(this.linkImage['link']['like'])
        this.linkImage['link']['isStatus'] = isStatus;
        this.numberOfImage = this.imagesList.length - 1;
      } else {
        
        this.linkImage = this.imagesList[this.numberOfImage];
        let isStatus = this.isStatusButton(this.linkImage['link']['like'])
        this.linkImage['link']['isStatus'] = isStatus;
        this.numberOfImage = this.numberOfImage - 1;
      }
    } else if (type === 'right') {
      if (this.imagesList[(this.numberOfImage + 1).toString()] === undefined) {
        this.linkImage = this.imagesList[0];
        let isStatus = this.isStatusButton(this.linkImage['link']['like'])
        this.linkImage['link']['isStatus'] = isStatus;
        this.numberOfImage = 0;
      } else {
        this.linkImage = this.imagesList[this.numberOfImage + 1];
        let isStatus = this.isStatusButton(this.linkImage['link']['like'])
        this.linkImage['link']['isStatus'] = isStatus;
        this.numberOfImage = this.numberOfImage + 1;
      }
    }
  }

  likeDislike(isStatus: Boolean) {
    if (!isStatus) {
      this.mediaService.likeImage(this.linkImage).subscribe(res => {
        // this.publication je metoda koju trebamo nadograditi kasnije
        this.editStatus(true);
      })
    } else {
      this.mediaService.dislikeImage(this.linkImage).subscribe(res => {
        this.editStatus(false);
      })
    }
    this.linkImage.link['isStatus'] = !this.linkImage.link['isStatus'];
  }

  addToProfile(item: any) {

  }

  editStatus(type: Boolean) {
    this.imagesList.filter(item => {
      if (item.link._id.toString() === this.linkImage.link['_id'].toString()) {
        if (type) {
          item.link.like.push(this.me._id);
        } else {
          item.link.like.splice(this.me._id, 1);
        }
      }
    })
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

  onStatusMe() {
    return this.linkImage['user']._id.toString() === this.me._id.toString();
  }
}
