import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as io from 'socket.io-client';
import { User } from '../../models/user';
import { Images } from '../../models/images';
import { Publication } from '../../models/publication';
import { UserService } from '../../services/user.service';
import { MediaService } from '../../services/media.service';
import { PublicationService } from '../../services/publication.service';
import { Global } from '../../global/global';
import { NotifierService } from 'angular-notifier';
import { GeolocationService } from '../../services/geolocation.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('profilLocation') profilLocation: ElementRef;
  @ViewChild('myModalImagePublication') myimage: ElementRef;
  private readonly notifier: NotifierService;
  private socket: any;

  user: User;
  userList: [User];
  status: Boolean;
  imgShow: Boolean;
  publication: [Publication];
  tab: String;
  showerChat: String;
  activeUser: Boolean;
  activePicture: Boolean;
  activeFriend: Boolean;
  btnSave: Boolean;
  btnCancel: Boolean;
  imagesList: any;
  imageLink: String;
  isRequester: Boolean;
  isResponder: Boolean;
  isFriends: Boolean;
  selectedFilesHeaderImage: File = null;
  urlsForHeaderImage: any;
  fd = new FormData();
  typeLocation: String;
  newLocationSave: any;
  click: Boolean;
  imagePublication: any;
  isAddPicture: any;
  addPictureConstruct: any;
  checkLocation: Boolean;
  constructor(
      notifier: NotifierService,
      private activatedRoute: ActivatedRoute,
      private publicationSercice: PublicationService,
      private userService: UserService,
      private mediaService: MediaService,
      private global: Global,
      private geolocationService: GeolocationService,
    ) {
    this.socket = io(this.global.getLink().split('/')[2]);
    this.user = null;
    this.status = false;
    this.imgShow = false;
    this.tab = 'home';
    this.showerChat = 'hide';
    this.activeUser = true;
    this.activeFriend = false;
    this.activePicture = false;
    this.imageLink = null;
    this.btnSave = false;
    this.btnCancel = false;
    this.isRequester = false;
    this.isResponder = false;
    this.userList = null;
    this.isFriends = false;
    this.typeLocation = 'userProfile';
    this.newLocationSave = {
      address: '',
      message: '',
      friends: []
    };
    this.notifier = notifier;
    this.click = false;
    this.imagePublication = null;
    this.isAddPicture = false;
    this.addPictureConstruct = {
      image: '',
      text: '',
      cordinate: {}
    };
    this.checkLocation = false;
  }

  ngOnInit() {
    console.info('ProfileComponent.ngOnInit() - Data initialization');
    this.initResponsiveElements();

    this.activatedRoute.params.subscribe(res =>{
      this.setInitOpcion();
      this.user = null;
      let id = JSON.parse(localStorage.getItem('user'))['_id'];
      if (id !== res['username']) {
        this.status = true;
        this.isRequester = false;
        this.isResponder = false;
        this.userService.getUser(res['username']).subscribe(resUser => {
          this.user = new User(resUser['user']);
          this.isRequester = resUser['isRequester'];
          this.isResponder = resUser['isResponder'];
          this.isFriends = resUser['isFriends'];
          this.getPublication();
        })
      } else {
        this.status = false;
        this.user = new User(JSON.parse(localStorage.getItem('user')));
        this.getPublication();
      }
    });

    this.socket.on('client-1', (data: any) => {
      console.log(data)
    })
  }

  setInitOpcion() {
    console.info('ProfileComponent.initResponsiveElements() - set opcion from defauilt')
    this.user = null;
    this.status = false;
    this.tab = 'home';
    this.showerChat = 'hide';
    this.activeUser = true;
    this.activeFriend = false;
    this.activePicture = false;
    this.imageLink = null;
    this.btnSave = false;
    this.btnCancel = false;
    this.isRequester = false;
    this.isResponder = false;
    this.userList = null;
    this.isFriends = false;
    this.activeUser = true;
    this.activeFriend = false;
    this.activePicture = false;
  }

  getPublication() {
    console.info('ProfileComponent.getPublication() - get all publication for ' + this.user.firstName);
    this.userService.getPublication(this.user).subscribe((res: [Publication]) => {
      this.publication = res['publication'];
    });
  }

  getFriends() {
    console.info('ProfileComponent.getFriends() - get list frineds');
    this.userList = null;
    this.userService.getFriends(this.user, 0).subscribe((res: [User]) => {
      this.userList = res['listFriends'];
    });
  }

  getImage() {
    console.info('ProfileComponent.getImage() - get data from server');
    this.imagesList = null;
    this.mediaService.getPicture(this.user._id).subscribe((res: any) =>{
      res.user += null;
      res.user = new User(this.user);
      this.imagesList = new Images(res).settingListImages();
    })
  }

  initResponsiveElements() {
    let width = window.innerWidth;
    if (width <= 768) {
      this.imgShow = true;
    } else {
      this.imgShow = false;
    }
  }

  openTab(item: any) {
    console.info('ProfileComponent.openTab() - push button in navbar in profile and open tab');
    this.tab = item;

    // let userTab = this.profilLocation.nativeElement.children['user-tab'];
    // console.log(userTab.children['user-tab-before'])
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

  openComentar() {
    if (this.showerChat === 'hide') {
      this.showerChat = 'show';
    } else {
      this.showerChat = 'hide';
    }
  }

  openImage(link: String) {
    console.info('ProfileComponent.openImage() - push button and open image in modal');
    this.imageLink = null;
    this.imageLink = link;
  }

  closeModal() {
    console.info('ProfileComponent.closeModal() - push button and close image in modal');
    if (this.imageLink !== null) {
      this.imageLink = null;
    }
  }

  likePicture(link: String) {
    console.log(link)
  }

  addFriends(user: User) {
    console.info('ProfileComponent.addFriends() - push button and add new friends');
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
    console.info('ProfileComponent.removeRelationShip() - push button and cancel reqvest friends');
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
    console.info('ProfileComponent.acceptRelationship() - push button and accept friends');
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
    console.info('ProfileComponent.removeFriends() - push button and delete frineds from frineds list');
    this.btnSave = true;
    this.userService.deleteFriends(user).subscribe(res => {
      this.btnSave = false;
      this.isFriends = false;
    })
  }

  onSelectImgForHeader(event) {
    console.info('ProfileComponent.onSelectImgForHeader() - push button and select image in local file');
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.selectedFilesHeaderImage = <File>event.target.files[0];

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.urlsForHeaderImage = event.target['result'];
      }
    }
  }

  ngHeaderImage() {
    console.info('ProfileComponent.ngHeaderImage() - push button and cancel selected images');
    this.urlsForHeaderImage = null;
    this.selectedFilesHeaderImage = null;
    this.fd = new FormData();
  }

  ngSaveImageHeader() {
    console.info('ProfileComponent.ngSaveImageHeader() - push button and save selected images');
    var datetimestamp = Date.now();
    let name = this.user.username + '.' + this.user._id + '.' + datetimestamp;
    this.fd.append('file', this.selectedFilesHeaderImage, name.toString());

    this.userService.saveImageProfile(this.fd, name.toString()).subscribe(res => {
      console.log(res);
      this.ngHeaderImage();
    })
  }

  onVoted(event: any) {
    this.newLocationSave.address =  event.address;
  }

  ngSaveLocation() {
    if (this.newLocationSave.address !== '') {

      this.publicationSercice.setNewLocation(this.newLocationSave).subscribe(res =>{
        this.notifier.notify( 'success', 'Uspjesno ste dodali lokaciju');
        // Trebamo prilagoditi podatke za prikaz iz res
        console.log(res)
        // this.publication.push()
      }, err => {
        this.notifier.notify( 'warning', 'Niste uspjeli da dodate lokaciju')
      })
    } else {
      this.notifier.notify( 'warning', 'Adresa nije dodata, morate dodati adresu')
    }
  }

  onImageEmiter(event: any) {
    this.imagePublication = event;

  }

  likeDislike(isStatus: Boolean) {
    if (!isStatus) {
      this.userService.likePublication(this.user, this.imagePublication).subscribe(res => {
        // this.publication je metoda koju trebamo nadograditi kasnije
        this.editStatus(true);
      })
    } else {
      this.userService.dislikePublication(this.user, this.imagePublication).subscribe(res => {
        this.editStatus(false);
      })
    }
    this.imagePublication.isStatus = !this.imagePublication.isStatus;
    
  }

  editStatus(type: Boolean) {
    this.publication.filter(item => {
      if (item._id.toString() == this.imagePublication._id.toString()) {
        if (type) {
          item.likes.push(JSON.parse(localStorage.getItem('user'))._id);
        } else {
          item.likes.splice(JSON.parse(localStorage.getItem('user'))._id, 1);
        }
      }
    })
  }

  addToProfile(link: any) {
    let isStatus = this.userService.isPicturDiferent(link.image);
    if (!isStatus) {
      this.userService.updateImageProfile(link.image).subscribe(res => {
        this.notifier.notify('success', 'Uspjesno ste postavili profilnu sliku')
        this.userService.setImageInLocalstorage(link.image);
        
      }, err => {
        this.notifier.notify('warning', 'Nismo mogli da obradimo ovaj zahtev')
      })
    } else {
      this.notifier.notify('info', 'Ova slika je vec profilna')
    }
  }

  filterCheck() {
    navigator.geolocation.getCurrentPosition(res => {
      this.addPictureConstruct.cordinate['latitude'] = res.coords.latitude;
      this.addPictureConstruct.cordinate['longitude'] = res.coords.longitude;
      this.addPictureConstruct.cordinate['accuracy'] = res.coords.accuracy;
    }, err => {
      this.notifier.notify('warning', 'Lokacija je iskljucena')
      this.checkLocation = false;
    })
  }

  ngSaveImagePublication() {
    var datetimestamp = Date.now();
    let name = this.user.username + '.' + this.user._id + '.' + datetimestamp;
    this.fd.append('file', this.selectedFilesHeaderImage, name.toString());
    this.addPictureConstruct.image = name;
    this.mediaService.addPicture(this.fd, name, this.addPictureConstruct).subscribe(res => {

      // console.log(res)
      // this.publication.push()
      // _id: "5e5c3d4659ba8031e806fb1d"
      // user_id: {_id: "5d8fcee2713b221a90811e91", firstName: "Novica", lastName: "Nikolić", username: "nole0223", email: "nole0223@gmail.com", …}
      // text: "test da li radi ovo"
      // image: null
      // location: {corrdinate: {…}, address: {…}}
      // datePublish: "2020-03-01T22:55:02.807Z"
      // likes: (2) ["5d8fcee2713b221a90811e91", "5dc48b5042323c0350a6a4fb"]
      // comments: []
      this.ngHeaderImage();
    }, err => {
      this.notifier.notify('error', 'Server nije dostupan')
    })

    
  }

}
