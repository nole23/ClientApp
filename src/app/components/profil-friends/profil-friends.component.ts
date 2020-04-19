import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { Images } from '../../models/images';
import { Publication } from '../../models/publication';
import { UserService } from '../../services/user.service';
import { MediaService } from '../../services/media.service';
import { Global } from '../../global/global';
import { NotifierService } from 'angular-notifier';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProfileImagesComponent } from '../plagin/modal/profile-images/profile-images.component';
import { UpdateProfilImageComponent } from '../plagin/modal/update-profil-image/update-profil-image.component';
import { AddLocationComponent } from '../plagin/modal/add-location/add-location.component';
import { AddPictureComponent } from '../plagin/modal/add-picture/add-picture.component';
import { DeleteFriendsComponent } from '../plagin/modal/delete-friends/delete-friends.component';

@Component({
  selector: 'app-profil-friends',
  templateUrl: '../profile/profile.component.html',
  styleUrls: ['../profile/profile.component.css']
})
export class ProfilFriendsComponent implements OnInit, OnDestroy {
  private readonly notifier: NotifierService;

  me: User;
  user: User;
  tab: String;
  numberOfPage: any;
  publication: [Publication];
  imagesList: any;
  typeLocation: String;
  activeUser: Boolean;
  activePicture: Boolean;
  btnSave: Boolean;
  btnCancel: Boolean;
  isRequester: Boolean;
  isResponder: Boolean;
  isFriends: Boolean;
  awaitToResposn: Boolean;
  status: Boolean;
  isLastElement: any;
  constructor(
    notifier: NotifierService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private mediaService: MediaService,
    public matDialog: MatDialog,
    private global: Global
  ) {
    this.notifier = notifier;
    this.me = JSON.parse(localStorage.getItem('user'));
    this.tab = 'profile';
    this.typeLocation = 'userProfile';
    this.publication = null;
    this.imagesList = null;
    this.user = null;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      if (this.user === null) {
        this.setInitOpcion();
        this.getFriends(res);
      } else {
        this.openTab(res['status']);
      }
    });
    this.global.setSidebar('profile');
  }

  setInitOpcion() {
    this.numberOfPage = 0;
    this.activeUser = true;
    this.activePicture = false;
    this.btnSave = false;
    this.btnCancel = false;
    this.isRequester = false;
    this.isResponder = false;
    this.isFriends = false;
    this.awaitToResposn = false;
    this.status = false;
    this.isLastElement = {
      publication: true,
      friend: true,
      picture: true
    }
  }

  getFriends(res: any) {
    this.userService.getUser(res['username']).subscribe(resUser => {
      this.user = new User(resUser['user']);
      this.isRequester = resUser['isRequester'];
      this.isResponder = resUser['isResponder'];
      this.isFriends = resUser['isFriends'];
      this.status = true;
      this.openTab(res['status']);
    })
  }

  openTab(item: any) {
    console.log(item)
    this.tab = item;
    if (item === 'profile') {
      this.activeUser = true;
      this.activePicture = false;
      if (this.publication === null) {
        this.getPublication();
      }
    } else if (item === 'picture') {
      this.activeUser = false;
      this.activePicture = true;
      if (this.imagesList === null) {
        this.getImage();
      }
    }
  }

  getPublication() {
    this.userService.getPublication(this.user, this.numberOfPage).subscribe((res: any) => {
      this.publication = res['message'];
      this.numberOfPage = this.numberOfPage + 1;
    });
  }

  getImage() {
    this.imagesList = null;
    this.mediaService.getPicture(this.user._id).subscribe((res: any) =>{
      res.user += null;
      res.user = new User(this.user);
      this.imagesList = new Images(res).settingListImages();
    })
  }

  openModal(link: String, type: String) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.minWidth = "400px"
    if (type === 'profilImage') {
      dialogConfig.data = {
        link: link
      }
      const modalDialogProfile = this.matDialog.open(ProfileImagesComponent, dialogConfig);
    } else if (type === 'updateImage') {
      const modalDialogUpdate = this.matDialog.open(UpdateProfilImageComponent, dialogConfig);
      modalDialogUpdate.afterClosed().subscribe(result => {
        if (result !== null) {
          this.notifier.notify( 'success', 'Uspjesno ste postavili sliku');
        }
      });
    } else if (type === 'addLocation') {
      const modalDialogAddLocation = this.matDialog.open(AddLocationComponent, dialogConfig);
      modalDialogAddLocation.afterClosed().subscribe(result =>{
        if (result !== null) {
          this.publication.unshift(result)
        }
      })
    } else if (type === 'addPicture') {
      const modalDialogAddPicture = this.matDialog.open(AddPictureComponent, dialogConfig);
      modalDialogAddPicture.afterClosed().subscribe(result =>{
        if (result === 'success') {
          this.notifier.notify('success', 'Uspesno ste dodali objavu')
        } else if (result === 'error') {
          this.notifier.notify('error', 'Objava nije dodata')
        } else if (result !== null) {
          this.notifier.notify('info', 'Pokusajte malo kasnije')
        } else {
          
        }
      })
    }
  }

  addFriends(user: User) {
    this.btnSave = true;
    this.userService.sendRelationship(user).subscribe(res => {
      if (res['message'] === 'save') {
        this.btnSave = false;
        this.status = true;
        this.isRequester = true;
        this.isResponder = false;
      } else {
        this.btnSave = false;
      }
    }, err => {
      this.btnSave = false;
    })
  }

  removeRelationShip(user: User) {
    this.btnCancel = true;
    this.userService.removeRelationship(user).subscribe(res => {
      this.btnCancel = false;
      this.isRequester = false;
      this.isResponder = false;
    }, err => {
      this.btnCancel = false;
    })
  }

  acceptRelationship(user: User) {
    this.btnSave = true;
    this.userService.acceptRelatuonship(user).subscribe(res => {
      this.btnSave = false;
      this.isRequester = false;
      this.isResponder = false;
      this.status = true;
      this.isFriends = true;
    })
  }

  removeFriends(user: User) {
    this.btnSave = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.minWidth = "400px";
    dialogConfig.data = {
      item: user
    }
    const modalDialogRemoveFriend = this.matDialog.open(DeleteFriendsComponent, dialogConfig);
    modalDialogRemoveFriend.afterClosed().subscribe(result => {
      this.btnSave = false;
      this.isFriends = false;
      if (result !== null) {
        this.btnSave = false;
        this.isFriends = false;
      }
    })
  }

  onEmitFriends(event: any) {
    // let index = this.userList.findIndex(x => x._id === event['id'].toString());
    // this.userList.splice(index, 1)
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= (event.target.scrollHeight - 500)) {

      if (this.tab === 'profile') {
        if (!this.awaitToResposn) {
          this.userService.getPublication(this.user, this.numberOfPage).subscribe((res: any) => {
  
            if (res['message'].length !== 0) {
              res['message'].forEach(element => {
                this.publication.push(element);
              });
              this.numberOfPage = this.numberOfPage + 1;
              this.awaitToResposn = false;
            } else {
              this.isLastElement.publication = !this.isLastElement.publication;
            }
            
          });
        }
  
        if (this.isLastElement.publication) {
          this.awaitToResposn = true;
        } else {
          this.awaitToResposn = false;
        }
      } else if (this.tab === 'friend') {
        console.log('prijatelji')
      } else if (this.tab === 'picture') {
        console.log('slike')
      }
    }
  }

  ngOnDestroy() {
    this.me = null;
    this.tab = 'profile';
    this.typeLocation = 'userProfile';
    this.publication = null;
    this.imagesList = null;
    this.user = null;
    this.setInitOpcion();
  }
}
