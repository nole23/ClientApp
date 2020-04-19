import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
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
import { AddTextComponent } from '../plagin/modal/add-text/add-text.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private readonly notifier: NotifierService;
  @ViewChild('images') images: ElementRef;

  user: User;
  tab: String;
  numberOfPage: any;
  publication: [Publication];
  imagesList: any;
  userList: [User];
  typeLocation: String;
  activeUser: Boolean;
  activePicture: Boolean;
  activeFriend: Boolean;
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
    this.user = new User(JSON.parse(localStorage.getItem('user')));
    this.tab = 'profile';
    this.typeLocation = 'userProfile';
    this.publication = null;
    this.imagesList = null;
    this.userList = null;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res =>{
      this.setInitOpcion();
      this.openTab(res['status']);
    });
    this.global.setSidebar('profile');
  }

  /**
   * Setujemo sve potrebne opcije za datu stranicu 
   * na defaultne vrijednosti kako bi novi korisnik mogao 
   * koji dolazi imao samo svoje opcije
   * 
   * Ovde se ne restartuju liste koje su od znacaja za brzi rad
   */
  setInitOpcion() {
    this.numberOfPage = 0;
    this.activeUser = true;
    this.activePicture = false;
    this.activeFriend = false;
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

  /**
   * Provjerimo koji tab treba da otvorimo i ucitamo te podatke,
   * pri tome ne ucitavamo ponovo podatke ukoliko su jednom ucitani
   * @param item 
   */
  openTab(item: any) {
    this.tab = item;

    if (item === 'profile') {
      this.activeUser = true;
      this.activeFriend = false;
      this.activePicture = false;
      if (this.publication === null) {
        this.getPublication();
      }
    } else if (item === 'picture') {
      this.activeUser = false;
      this.activeFriend = false;
      this.activePicture = true;
      if (this.imagesList === null) {
        this.getImage();
      }
    } else if (item === 'friend') {
      this.activeUser = false;
      this.activeFriend = true;
      this.activePicture = false;
      if (this.userList === null) {
        this.getFriends();
      }
    }
  }

  getPublication() {
    this.userService.getPublication(this.user, this.numberOfPage).subscribe(res => {
      this.publication = res['message'];
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

  /**
   * Restartujemo sve opcije pa i one koje su nam bitne za brzi rad
   * kako bi se oslobodila memorija koja je koristena za dati tab
   */
  ngOnDestroy() {
    this.user = null;
    this.tab = 'profile';
    this.typeLocation = 'userProfile';
    this.publication = null;
    this.imagesList = null;
    this.userList = null;
    this.setInitOpcion();
  }
}
