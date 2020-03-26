import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { DeleteFriendsComponent } from '../plagin/modal/delete-friends/delete-friends.component';

@Component({
  selector: 'app-profil-friends',
  templateUrl: '../profile/profile.component.html',
  styleUrls: ['../profile/profile.component.css']
})
export class ProfilFriendsComponent implements OnInit, OnDestroy {

  private readonly notifier: NotifierService;

  user: User;
  me: User;
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
  constructor(
    notifier: NotifierService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private mediaService: MediaService,
    public matDialog: MatDialog
  ) {
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
    this.isFriends = false;
    this.typeLocation = 'userProfile';
    this.notifier = notifier;
    this.me = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.setInitOpcion();

      this.status = true;
      this.isRequester = false;
      this.isResponder = false;

      this.userService.getUser(res['id']).subscribe(resUser => {

        this.user = new User(resUser['user']);
        this.isRequester = resUser['isRequester'];
        this.isResponder = resUser['isResponder'];
        this.isFriends = resUser['isFriends'];
        this.getPublication();
      })
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
    // console.info('ProfileComponent.getPublication() - get all publication for ' + this.user.firstName);
    this.userService.getPublication(this.user).subscribe((res: [Publication]) => {
      this.publication = res['publication'];
    });
  }

  getFriends() {
    // console.info('ProfileComponent.getFriends() - get list frineds');
    this.userList = null;
    this.userService.getFriends(this.user, 0).subscribe((res: [User]) => {
      this.userList = res['listFriends'];
    });
  }

  getImage() {
    // console.info('ProfileComponent.getImage() - get data from server');
    this.imagesList = null;
    this.mediaService.getPicture(this.user._id).subscribe((res: any) =>{
      res.user += null;
      res.user = new User(this.user);
      this.imagesList = new Images(res).settingListImages();
    })
  }

  openTab(item: any) {
    // console.info('ProfileComponent.openTab() - push button in navbar in profile and open tab');
    this.tab = item;
    if (item === 'home') {
      this.activeUser = true;
      this.activeFriend = false;
      this.activePicture = false;
      this.getPublication();
    } else if (item === 'picture') {
      this.activeUser = false;
      this.activeFriend = true;
      this.activePicture = false;
      this.getImage();
    } else if (item === 'friend') {
      this.activeUser = false;
      this.activeFriend = false;
      this.activePicture = true;
      this.getFriends();
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

          // TODO Ovde mozemo napraviti nesto sto ce omoguciti da se
          // automatski promjeni slika 
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
    // console.info('ProfileComponent.addFriends() - push button and add new friends');
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
    // console.info('ProfileComponent.removeRelationShip() - push button and cancel reqvest friends');
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
    // console.info('ProfileComponent.acceptRelationship() - push button and accept friends');
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
    // console.info('ProfileComponent.removeFriends() - push button and delete frineds from frineds list');
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
      // Ako se sjetim nesto da uradim
      this.btnSave = false;
      this.isFriends = false;
      if (result !== null) {
        this.btnSave = false;
        this.isFriends = false;
        this.onEmitFriends(result)
      }
    })
  }

  onEmitFriends(event: any) {
    let index = this.userList.findIndex(x => x._id === event['id'].toString());
    this.userList.splice(index, 1)
  }

  ngOnDestroy() {
    this.setInitOpcion();
  }
}
