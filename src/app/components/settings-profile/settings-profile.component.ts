import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Global } from 'src/app/global/global';
import { Settings } from 'src/app/models/settings';
import { UserService } from 'src/app/services/user.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { LoginService } from 'src/app/services/login.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-settings-profile',
  templateUrl: './settings-profile.component.html',
  styleUrls: ['./settings-profile.component.css']
})
export class SettingsProfileComponent implements OnInit {
  private readonly notifier: NotifierService;
  @ViewChild('firstTab') firstTab: ElementRef;
  @ViewChild('secondTab') secondTab: ElementRef;
  @ViewChild('thirdTab') thirdTab: ElementRef;
  @ViewChild('fourthTab') fourthTab: ElementRef;

  me: any;
  tab: any;
  allOptions: any;
  otherInformation: any
  securityInformation: any;
  privateInformation: any;
  otherPrivateInformation: any;
  isEditValue: Boolean;
  data: any;
  mount: any;
  year: any;
  setDate: any;
  sex: any;
  isLoader: Boolean;
  city: any;
  findAddress: any;
  timer: any;
  listCity: any;
  typeIsVisit: any;
  listLanguage: any;
  birdthDay: Boolean;
  jab: Boolean;
  constructor(
    notifier: NotifierService,
    public el: ElementRef,
    private global: Global,
    private userService: UserService,
    private loginService: LoginService,
    private geolocationService: GeolocationService
  ) {
    this.notifier = notifier;
    this.me = JSON.parse(localStorage.getItem('user'));
    this.tab = 'first';
    this.otherInformation = null;
    this.securityInformation = null;
    this.privateInformation = null;
    this.otherPrivateInformation = null;
    this.isEditValue = true;
    this.listLanguage = null;
    this.findAddress = {
      country: null,
      region: null,
      city: null
    }
    this.data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    this.mount = [
      {i: 1, item: 'Januar'},
      {i: 2, item: 'Februar'},
      {i: 3, item: 'Mart'},
      {i: 4, item: 'April'},
      {i: 5, item: 'Maj'},
      {i: 6, item: 'Jun'},
      {i: 7, item: 'Jul'},
      {i: 8, item: 'Avgust'},
      {i: 9, item: 'Septembar'},
      {i: 10, item: 'Oktobar'},
      {i: 11, item: 'Novembar'},
      {i: 12, item: 'Decembar'},
    ];
    this.year = [];
    this.sex = [
      {type: 'men', item: 'musko'},
      {type: 'women', item: 'zensko'}
    ];
    this.setDate = {
      day: '',
      mount: '',
      year: ''
    }
    this.isLoader = false;
    this.typeIsVisit = [
      {i: 1, type: 'all', name: 'Svi'},
      {i: 2, type: 'friends', name: 'Samo prijatelji'},
      {i: 3, type: 'nothing', name: 'Niko'}
    ]
  }

  ngOnInit() {
    let dt = new Date().getFullYear();
    this.allOptions = this.global.getOptions();
    for (let i = dt; i > (dt - 101); i--) {
      this.year.push(i)
    }
    this.getOtherInformation()
  }

  getOtherInformation() {
    this.otherInformation = this.parseData(this.me, this.allOptions.GeneralData);
  }

  getSecurityInformation() {
    this.securityInformation = this.parseData(this.me, this.allOptions.Account);
  }

  getPrivateInformation() {
    this.privateInformation = this.parseData(this.me, this.allOptions.OtherInformations);
  }

  getOtherPrivateInformation() {
    let item = {
      data: JSON.parse(localStorage.getItem('options')),
      icon: null,
      title: null
    }
    this.otherPrivateInformation = this.parseData(null, item);

    this.geolocationService.getAllLanguage().subscribe(res => {
      this.listLanguage = res['message'];
    })
  }

  opneTab(item: String) {
    this.tab = item;
    this.isEditValue = true;
    if (item === 'first') {
      if (this.otherInformation === null) {
        this.getOtherInformation();
      }
    } else if (item === 'second') {
      if (this.securityInformation === null) {
        this.getSecurityInformation();
      }
    } else if (item === 'third') {
      if (this.privateInformation === null) {
        this.getPrivateInformation();
      }
    } else if (item === 'fourth') {
      if (this.otherPrivateInformation === null) {
        this.getOtherPrivateInformation();
      }
    }
  }

  saveEdit(type: String) {
    this.isLoader = true;
    if (type === 'first') {

      let data = {}

      for (let i=0; i<this.otherInformation.data.length; i++) {

        let item = this.firstTab.nativeElement.children['input-value-' + this.otherInformation.data[i].idName]
        if (this.otherInformation.data[i].idName !== 'dateOfBirth' && this.otherInformation.data[i].idName !== 'sex') {
          data[this.otherInformation.data[i].idName] = item.querySelector('#item-' + this.otherInformation.data[i].idName).value
        } else if (this.otherInformation.data[i].idName === 'dateOfBirth') {
          
          if (item.querySelector('#input-value-year').value) {
            
            if (item.querySelector('#input-value-mount').value) {
              
              if (item.querySelector('#input-value-day').value) {
                let completDate = item.querySelector('#input-value-year').value + '-' + item.querySelector('#input-value-mount').value + '-' + item.querySelector('#input-value-day').value
                data[this.otherInformation.data[i].idName] = new Date(completDate)
              }
            }
          }
        } else if (this.otherInformation.data[i].idName === 'sex') {
          
          if (item.querySelector('#input-value-sex').value) {
            data[this.otherInformation.data[i].idName] = item.querySelector('#input-value-sex').value;
          }
        }
      }

      this.userService.editProfile('', data).subscribe(res =>{
        if (res['message']) {
          this.notifier.notify('success', 'Promene su azurirane')
        } else {
          this.notifier.notify('error', 'Nismo uspeli da izvrsimo promene')
        }
        this.isLoader = false;
      }) 
    } else if (type === 'second') {
      let data = {}
      let firstPassword = '';
      let idName = ''
      for (let i=0; i<this.securityInformation.data.length; i++) {
        let item = this.secondTab.nativeElement.children['input-value-' + this.securityInformation.data[i].idName];
        if (item.querySelector('#item-' + this.securityInformation.data[i].idName).value) {
          if (this.securityInformation.data[i].idName === 'password') {
            firstPassword = item.querySelector('#item-' + this.securityInformation.data[i].idName).value
            idName = this.securityInformation.data[i].idName
          } else if (this.securityInformation.data[i].idName === 'repassword') {
            if (firstPassword.toString() === item.querySelector('#item-' + this.securityInformation.data[i].idName).value.toString()) {
              data[idName] = item.querySelector('#item-' + this.securityInformation.data[i].idName).value;
            } else {
              this.notifier.notify('warning', 'Sifre se ne podudaraju')
            }
          } else {
            data[this.securityInformation.data[i].idName] = item.querySelector('#item-' + this.securityInformation.data[i].idName).value
          }
        }
        
      }
      this.userService.editProfile('password', data).subscribe(res =>{
        if (res['message']) {
          this.notifier.notify('success', 'Promene su azurirane')
        } else {
          this.notifier.notify('error', 'Nismo uspeli da izvrsimo promene')
        }
        this.isLoader = false;
      })     
    } else if (type === 'third') {
      let data = {};

      for (let i=0; i<this.privateInformation.data.length; i++) {
        let item = this.thirdTab.nativeElement.children['input-value-' + this.privateInformation.data[i].idName];
      
        if (item.querySelector('#item-' + this.privateInformation.data[i].idName).value) {
          if (this.privateInformation.data[i].idName !== 'address') {
            data[this.privateInformation.data[i].idName] = item.querySelector('#item-' + this.privateInformation.data[i].idName).value;
          } else if (this.privateInformation.data[i].idName === 'address') {
            if (this.findAddress.city !== null) {
              data[this.privateInformation.data[i].idName] = this.findAddress;
            }
          }
        }
      }
      this.userService.editProfile('information', data).subscribe(res =>{
        if (res['message']) {
          this.notifier.notify('success', 'Promene su azurirane')
        } else {
          this.notifier.notify('error', 'Nismo uspeli da izvrsimo promene')
        }
        this.isLoader = false;
      })
    } else if (type === 'fourth') {
      let data = {};

      for (let i=0; i<this.otherPrivateInformation.data.length; i++) {
        let item = this.fourthTab.nativeElement.children['input-value-' +  this.otherPrivateInformation.data[i].idName];
        if (item.querySelector('#item-' + this.otherPrivateInformation.data[i].idName).value) {
          if (this.otherPrivateInformation.data[i].idName !== 'birdthDay' && this.otherPrivateInformation.data[i].idName !== 'jab') {
            data[this.otherPrivateInformation.data[i].idName] = item.querySelector('#item-' + this.otherPrivateInformation.data[i].idName).value;
          } else if (this.otherPrivateInformation.data[i].idName === 'birdthDay') {
            if (this.birdthDay) {
              data[this.otherPrivateInformation.data[i].idName] = this.birdthDay;
            }
          } else if (this.otherPrivateInformation.data[i].idName === 'jab') {
            if (this.jab) {
              data[this.otherPrivateInformation.data[i].idName] = this.jab;
            }
          }
          
          
        }
      }
      this.userService.editProfile('configuration', data).subscribe(res =>{
        if (res['message']) {
          this.notifier.notify('success', 'Promene su azurirane')
        } else {
          this.notifier.notify('error', 'Nismo uspeli da izvrsimo promene')
        }
        this.isLoader = false;
      })
    }
  }

  filterCity(isStatys: Boolean) {
    clearTimeout(this.timer);
    if (isStatys) {
      this.timer = setTimeout(() => {this.filterCity(false) },1000);
    } else {
      if (this.city.length > 1) {
        this.geolocationService.getServerAddress(this.city).subscribe(res => {
          this.listCity = res['message'];
        })
      }
    }
  }

  setiAddress(item: any) {
    this.findAddress.city = item.address.city;
    this.findAddress.country = item.address.country;
    this.findAddress.region = item.address.state;
  }

  parseData(item: any, generalData: any) {
    let data = {
      title: generalData.title,
      icon: generalData.icon,
      data: []
    };
    for (let i = 0; i < generalData.data.length; i++) {
      data['data'].push({
        image: false,
        name: generalData.data[i].name,
        show: true,
        type: generalData.data[i].type,
        value: item !== null ? this.getValue(item, generalData.data[i].idData) : generalData.data[i].value,
        idName: generalData.data[i].idName,
        selectionParameter: generalData.data[i].selections
      })
    }
    return data;
  }

  getValue(value: any, type: any) {
    if (type.length === 1) {
      return value[type[0]]
    } else if (type.length === 2) {
      let children = null;
      for (let i = 0; i < type.length; i++) {
        if (i === 0 ) {
          children = value[type[i]];
        }
        if (i === 1) {
          return children[type[i]];
        }
      }
    } else if (type.length === 3) {

      let children = null;
      let twoChildren = null;
      for (let i = 0; i < type.length; i++) {
        if (i === 0 ) {
          children = value[type[i]];
        }
        if (i === 1) {
          twoChildren = children[type[i]];
        } if (i === 2) {
          return twoChildren[type[i]];
        }
      }
    }
  }
}
