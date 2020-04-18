import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { Images } from '../../models/images';
import { Publication } from '../../models/publication';
import { UserService } from '../../services/user.service';
import { MediaService } from '../../services/media.service';
import { NotifierService } from 'angular-notifier';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProfileImagesComponent } from '../plagin/modal/profile-images/profile-images.component';
import { UpdateProfilImageComponent } from '../plagin/modal/update-profil-image/update-profil-image.component';
import { AddLocationComponent } from '../plagin/modal/add-location/add-location.component';
import { AddPictureComponent } from '../plagin/modal/add-picture/add-picture.component';
import { AddTextComponent } from '../plagin/modal/add-text/add-text.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private readonly notifier: NotifierService;

  user: User;
  userList: [User];
  status: Boolean;
  publication: [Publication];
  tab: String;
  activeUser: Boolean;
  activePicture: Boolean;
  activeFriend: Boolean;
  btnSave: Boolean;
  btnCancel: Boolean;
  imagesList: any;
  isRequester: Boolean;
  isResponder: Boolean;
  isFriends: Boolean;
  typeLocation: String;
  awaitToResposn: Boolean;
  numberOfPage: any;
  isLastElement: any;
  constructor(
    notifier: NotifierService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private mediaService: MediaService,
    public matDialog: MatDialog
  ) {
    this.user = null;
    this.status = false;
    this.tab = 'home';
    this.activeUser = true;
    this.activeFriend = false;
    this.activePicture = false;
    this.btnSave = false;
    this.btnCancel = false;
    this.isRequester = false;
    this.isResponder = false;
    this.userList = null;
    this.imagesList = null;
    this.isFriends = false;
    this.typeLocation = 'userProfile';
    this.notifier = notifier;
    this.awaitToResposn = false;
    this.numberOfPage = 0;
    this.isLastElement = {
      publication: true,
      friend: true,
      picture: true
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res =>{
      this.setInitOpcion();
      
      this.status = false;
      this.user = new User(JSON.parse(localStorage.getItem('user')));
      this.getPublication();
    });
  }

  setInitOpcion() {
    this.user = null;
    this.status = false;
    this.tab = 'home';
    this.activeUser = true;
    this.btnSave = false;
    this.btnCancel = false;
    this.isRequester = false;
    this.isResponder = false;
    this.userList = null;
    this.isFriends = false;
    this.activeFriend = false;
    this.activePicture = false;
  }

  getPublication() {
    this.userService.getPublication(this.user, this.numberOfPage).subscribe((res: [Publication]) => {
      this.publication = res['publication'];
      this.numberOfPage = this.numberOfPage + 1;
    });
  }

  getFriends() {
    this.userService.getFriends(this.user, 0).subscribe((res: [User]) => {
      this.userList = res['listFriends'];
    });
  }

  getImage() {
    this.mediaService.getPicture(this.user._id).subscribe((res: any) =>{
      res.user += null;
      res.user = new User(this.user);
      this.imagesList = new Images(res).settingListImages();
    })
  }

  openTab(item: any) {
    this.tab = item;

    if (item === 'home') {
      this.activeUser = true;
      this.activeFriend = false;
      this.activePicture = false;
      if (this.publication === null) {
        this.getPublication();
      }
    } else if (item === 'picture') {
      this.activeUser = false;
      this.activeFriend = true;
      this.activePicture = false;
      if (this.imagesList === null) {
        this.getImage();
      }
    } else if (item === 'friend') {
      this.activeUser = false;
      this.activeFriend = false;
      this.activePicture = true;
      if (this.userList === null) {
        this.getFriends();
      }
    }
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
          this.publication.unshift(result.message)
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
    } else if (type === 'addComent') {
      const modalDialogAddText = this.matDialog.open(AddTextComponent, dialogConfig);
      modalDialogAddText.afterClosed().subscribe(result => {
        if(result !== null) {
          this.publication.unshift(result.message)
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

  onEmitPublic(event: any) {
    if (event['type'] === 'public') {
    } else if (event['type'] === 'delete') {
      let index = this.publication.findIndex(x => x._id === event['public']['_id'].toString());
      this.publication.splice(index, 1)
    }
  }

  onEmitFriends(event: any) {
    let index = this.userList.findIndex(x => x._id === event['id'].toString());
    this.userList.splice(index, 1);
    this.btnSave = true;
    this.isFriends = false;
  }

  ngOnDestroy() {
    this.setInitOpcion();
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= (event.target.scrollHeight - 500)) {
      if (!this.awaitToResposn) {
        this.userService.getPublication(this.user, this.numberOfPage).subscribe((res: [Publication]) => {
          if (res['publication'].length !== 0) {
            res['publication'].forEach(element => {
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
    }
  }
}
