import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Global } from 'src/app/global/global';
import { Settings } from 'src/app/models/settings';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings-profile',
  templateUrl: './settings-profile.component.html',
  styleUrls: ['./settings-profile.component.css']
})
export class SettingsProfileComponent implements OnInit {
  @ViewChild('prod') prod: ElementRef;

  data: any;
  isStatus: boolean;
  settings: Settings;
  btnSave: Boolean;
  constructor(public el: ElementRef, private global: Global, private userService: UserService) {
    this.data = null;
    this.isStatus = false;
    this.btnSave = false;
  }

  ngOnInit() {
    console.info('SettingsProfileCommponent.ngOnInit() - Data initialization');

    let opcions = this.global.getOptions();
    let user = JSON.parse(localStorage.getItem('user'));

    let opcion = this.parseData(user, opcions.GeneralData);
    let account = this.parseData(user, opcions.Account);
    let privacy = this.parseData(user, opcions.Privacy);
    let otherInformations = this.parseData(user, opcions.OtherInformations);

    this.data = [opcion, account, otherInformations, privacy];
  }

  parseData(item: any, generalData: any) {
    console.info('SettingsProfileCommponent.parseData() - Parsing data for input type');
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
        value: this.getValue(item, generalData.data[i].idData),
        idName: generalData.data[i].idName
      })
    }
    return data;
  }

  getValue(value: any, type: any) {
    console.info('SettingsProfileCommponent.getValue() - Extracting values based on a key ' + type + ' from an object');
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

  ngSetting(i: String) {
    console.info('SettingsProfileCommponent.ngSetting() - Push button for opne/close settings section');
    let select = this.prod.nativeElement.children['settings-id-' + i];
    for (let j = 1; j<select.children.length - 1; j++) {
      
      if (!this.isStatus) {
        select.children[j].classList.remove('b-b-1')
        select.children[select.children.length - 1].classList.remove('hide');
        select.children[select.children.length - 1].classList.add('show');

        select.children[j].children['value-' + i].classList.add('hide')
        select.children[j].children['value-' + i].classList.remove('show')

        select.children[j].children['input-' + i].classList.add('show')
        select.children[j].children['input-' + i].classList.remove('hide')
      } else {
        select.children[j].classList.add('b-b-1')
        select.children[select.children.length - 1].classList.add('hide');
        select.children[select.children.length - 1].classList.remove('show');

        select.children[j].children['value-' + i].classList.remove('hide')
        select.children[j].children['value-' + i].classList.add('show')

        select.children[j].children['input-' + i].classList.remove('show')
        select.children[j].children['input-' + i].classList.add('hide')
      }
    }

    if (this.isStatus) {
      this.isStatus = false;
    } else {
      this.isStatus = true;
    }
  }

  ngSaveEdit(i: any) {
    console.info('SettingsProfileCommponent.ngSaveEdit() - Push button for save change date');

    this.btnSave = true;
    const select = this.prod.nativeElement.children['settings-id-' + i];
    const object = {};
    for (let j = 1; j<select.children.length - 1; j++) {
      object[select.children[j].children['input-' + i].querySelector('input').name] = select.children[j].children['input-' + i].querySelector('input').value;
    }

    if (i === 0) {
      this.userService.editGeneralData(object).subscribe((res: any) => {
        this.btnSave = false;
        this.editData(object, i);
        this.ngSetting(i);
      })
    }

    if (i === 1) {
      this.userService.editAccount(object).subscribe((res: any) => {
        this.btnSave = false;
        this.userService.logout();
      })
    }

    if (i === 2) {
      this.userService.editOtherInformation(object).subscribe((res: any) => {
        this.btnSave = false;
        this.ngSetting(i);
      })
      // 
    }

    if (i === 3) {
      console.log('privatne inforamcije')
    }
  }

  editData(object: any, index: any) {
    console.info('SettingsProfileCommponent.editData() - Edit date after server edit')
    this.data[index].data.forEach((data) => {
      if (object[data.idName]) data.value = object[data.idName];
    })

    this.global.editLocalStorage(object);
  }

  ngShowText(value: String) {
    if (value === undefined) {
      return '';
    }
    if (value.length > 30) {
      let string = '';
      for (let i = 0; i < 30; i++) {
        string += value[i];
      }
      string += ' . . . ';
      return string;
    } else {
      return value;
    }
  }
}
