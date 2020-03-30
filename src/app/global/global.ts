import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Global {

    linkLocalhostChat: String;
    linkLocalhostStatus: String;
    linkLocalhostMedia: string;
    linkLocalhost: string;
    linkWebhost: string;
    panleOptions: any;
    listSmile: any;
    smile: any;
    simbol: any;
    isChangeLocationStatus: Boolean;
    abc: any;
    isAutoLocation: Boolean;
    constructor() {
        this.isAutoLocation = false;
        this.isChangeLocationStatus = false;
        this.simbol = [
          ':)', ':joy', ':cry', ':ang', ':P', ':rang', ';)', ':dis', ':<', ':emb',
          ':O', ':(', ':x', ':$', ':-a', ':-8', ':88', ';-sho', ':-ick', ':#',
          ':z', ';sur', ':o', ':h', ':-rich', ':666', ':sk', ':-c', ';-ro', ':poo',
          ':-s', ':g', ':-p', ':-x', ':-ey', ':-o3', ':-C', ':H', ':-%', ':T',':5',
          ':7', ';-mart', ';pss', ':D', ':y', ':Y', ':>', ':na', ';r', ';O', ';q'
        ]
        this.listSmile = [
            ['smile', 'assets/picture/emoticion/first/001.svg']
        ];
        this.smile = {
            smile: [
                "assets/picture/emoticion/first/1.svg","assets/picture/emoticion/first/2.svg","assets/picture/emoticion/first/3.svg","assets/picture/emoticion/first/4.svg","assets/picture/emoticion/first/5.svg",
                "assets/picture/emoticion/first/6.svg","assets/picture/emoticion/first/7.svg","assets/picture/emoticion/first/8.svg","assets/picture/emoticion/first/9.svg","assets/picture/emoticion/first/10.svg",
                "assets/picture/emoticion/first/11.svg","assets/picture/emoticion/first/12.svg","assets/picture/emoticion/first/13.svg","assets/picture/emoticion/first/14.svg","assets/picture/emoticion/first/15.svg",
                "assets/picture/emoticion/first/16.svg","assets/picture/emoticion/first/17.svg","assets/picture/emoticion/first/18.svg","assets/picture/emoticion/first/19.svg","assets/picture/emoticion/first/20.svg",
                "assets/picture/emoticion/first/21.svg","assets/picture/emoticion/first/22.svg","assets/picture/emoticion/first/23.svg","assets/picture/emoticion/first/24.svg","assets/picture/emoticion/first/25.svg",
                "assets/picture/emoticion/first/26.svg","assets/picture/emoticion/first/27.svg","assets/picture/emoticion/first/28.svg","assets/picture/emoticion/first/29.svg","assets/picture/emoticion/first/30.svg",
                "assets/picture/emoticion/first/31.svg","assets/picture/emoticion/first/32.svg","assets/picture/emoticion/first/33.svg","assets/picture/emoticion/first/34.svg","assets/picture/emoticion/first/35.svg",
                "assets/picture/emoticion/first/36.svg","assets/picture/emoticion/first/37.svg","assets/picture/emoticion/first/38.svg","assets/picture/emoticion/first/39.svg","assets/picture/emoticion/first/40.svg",
                "assets/picture/emoticion/first/41.svg","assets/picture/emoticion/first/42.svg","assets/picture/emoticion/first/43.svg","assets/picture/emoticion/first/44.svg","assets/picture/emoticion/first/45.svg",
                "assets/picture/emoticion/first/46.svg","assets/picture/emoticion/first/47.svg","assets/picture/emoticion/first/48.svg","assets/picture/emoticion/first/49.svg","assets/picture/emoticion/first/50.svg"
            ]
        };
        this.linkLocalhostChat = 'https://twoway-chatservice.herokuapp.com/api/'
        this.linkLocalhost = 'https://twoway-usersservice.herokuapp.com/api/';
        this.linkLocalhostMedia = 'https://twoway-mediaservice.herokuapp.com/api/';
        this.linkLocalhostStatus = 'https://twoway-statusservice.herokuapp.com/api/';
        this.linkWebhost = 'https:';
        this.panleOptions = {
            GeneralData: {
                title: 'Podaci o tebi',
                icon: 'fa fa-pencil-square-o fa-2x',
                data: [
                    {name: 'Ime', type: 'String', idData: ['firstName'], idName: 'firstName'},
                    {name: 'Prezime', type: 'String', idData: ['lastName'], idName: 'lastName'},
                    {name: 'Datum rodjenja', type: 'Date', idData: ['otherInformation', 'dateOfBirth'], idName: 'dateOfBirth'},
                    {name: 'Pol', type: 'String', idData: ['otherInformation', 'sex'], idName: 'sex'}
                ]
            },
            Account: {
                title: 'Tvoj nalog',
                icon: 'fa fa-pencil-square-o fa-2x',
                data: [
                    {name: 'Email', type: 'String', idData: ['email'], idName: 'email'},
                    {name: 'Sifra', type: 'Password', idData: ['password'], idName: 'password'},
                    {name: 'Ponoviti sifru', type: 'Password', idData: ['repassword'], idName: 'repassword'},
                ]
            },
            OtherInformations: {
                title: 'Ostale informacije',
                icon: 'fa fa-pencil-square-o fa-2x',
                data: [
                    {name: 'O meni', type: 'String', idData: ['otherInformation', 'about'], idName: 'about'},
                    {name: 'Drzava', type: 'String', idData: ['otherInformation', 'adress', 'country'], idName: 'country'},
                    {name: 'Regija', type: 'String', idData: ['otherInformation', 'adress', 'region'], idName: 'region'},
                    {name: 'Grad', type: 'String', idData: ['otherInformation', 'adress', 'city'], idName: 'city'},
                    {name: 'Profesija', type: 'String', idData: ['otherInformation', 'jobs', 'name'], idName: 'name'},
                    {name: 'Gde radite?', type: 'String', idData: ['otherInformation', 'jobs', 'nameCompany'], idName: 'nameCompany'},
                    {name: 'Mesto', type: 'String', idData: ['otherInformation', 'jobs', 'places'], idName: 'places'},
                ]
            },
            Privacy: {
                title: 'Privatnost',
                icon: 'fa fa-pencil-square-o fa-2x',
                data: [
                    {name: 'Posetioci', type: 'String', idData: ['accept'], idName: 'accept'},
                    {name: 'Ko moze da mi posalje poruku', type: 'String', idData: ['all'], idName: 'all'},
                ]
            }
        }
    }

    getLink() {
        return this.linkLocalhost;
    }

    getMediaLink() {
        return this.linkLocalhostMedia;
    }

    getLinkStatus() {
        return this.linkLocalhostStatus;
    }

    getOptions() {
        return this.panleOptions;
    }

    getChat() {
        return this.linkLocalhostChat;
    }

    geIOLing(link: any) {
        let allowedOrigins = link.split('/')[0] + link.split('/')[1] + link.split('/')[2];
        return allowedOrigins;
    }

    editLocalStorage(object: any) {
        console.info('Global.editLocalStorage() - Edit localstorage when update profile for client')
        
        var newJson = JSON.parse(localStorage.getItem('user'));

        if (object['email']) newJson.email = object['email'];
        if (object['username']) newJson.username = object['username'];
        if (object['about']) newJson.about = object['about'];
        if (object['city']) newJson.address.city = object['city'];
        if (object['country']) newJson.address.country = object['country'];
        if (object['region']) newJson.address.region = object['region'];
        if (object['name']) newJson.jobs.name = object['name'];
        if (object['nameCompany']) newJson.jobs.nameCompany = object['nameCompany'];
        if (object['places']) newJson.jobs.places = object['places'];
        if (object['coverPhoto']) newJson.publicMedia.coverPhoto = object['coverPhoto'];
        if (object['profileImage']) newJson.publicMedia.profileImage = object['profileImage'];
        if (object['firstName']) newJson.firstName = object['firstName'];
        if (object['lastName']) newJson.lastName = object['lastName'];
        if (object['dateOfBirth']) newJson['otherInformation'].dateOfBirth = object['dateOfBirth'];
        if (object['sex']) newJson['otherInformation'].sex = object['sex'];
        
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(newJson));
    }

    getFunction(item: any) {
        return this.smile[item.toString()];
    }

    getList() {
        return this.listSmile;
    }

    _setSmile(item: any) {
      for (let i=1; i<52; i++) {
        if (item === 'assets/picture/emoticion/first/' + i + '.svg') {
          return this.simbol[i].toString();
        }
      }
    }

    ngReplice(s: string) {
        let emoticons = {
            a01: '<img src="assets/picture/emoticion/first/1.svg" width="20px" height="20px"/>',
            a02: '<img src="assets/picture/emoticion/first/2.svg" width="20px" height="20px"/>',
            a03: '<img src="assets/picture/emoticion/first/3.svg" width="20px" height="20px"/>',
            a04: '<img src="assets/picture/emoticion/first/4.svg" width="20px" height="20px"/>',
            a05: '<img src="assets/picture/emoticion/first/5.svg" width="20px" height="20px"/>',
            a06: '<img src="assets/picture/emoticion/first/6.svg" width="20px" height="20px"/>',
            a07: '<img src="assets/picture/emoticion/first/7.svg" width="20px" height="20px"/>',
            a08: '<img src="assets/picture/emoticion/first/8.svg" width="20px" height="20px"/>',
            a09: '<img src="assets/picture/emoticion/first/9.svg" width="20px" height="20px"/>',
            a10: '<img src="assets/picture/emoticion/first/10.svg" width="20px" height="20px"/>',
            a11: '<img src="assets/picture/emoticion/first/11.svg" width="20px" height="20px"/>',
            a12: '<img src="assets/picture/emoticion/first/12.svg" width="20px" height="20px"/>',
            a13: '<img src="assets/picture/emoticion/first/13.svg" width="20px" height="20px"/>',
            a14: '<img src="assets/picture/emoticion/first/14.svg" width="20px" height="20px"/>',
            a15: '<img src="assets/picture/emoticion/first/15.svg" width="20px" height="20px"/>',
            a16: '<img src="assets/picture/emoticion/first/16.svg" width="20px" height="20px"/>',
            a17: '<img src="assets/picture/emoticion/first/17.svg" width="20px" height="20px"/>',
            a18: '<img src="assets/picture/emoticion/first/18.svg" width="20px" height="20px"/>',
            a19: '<img src="assets/picture/emoticion/first/19.svg" width="20px" height="20px"/>',
            a20: '<img src="assets/picture/emoticion/first/20.svg" width="20px" height="20px"/>',
            a21: '<img src="assets/picture/emoticion/first/21.svg" width="20px" height="20px"/>',
            a22: '<img src="assets/picture/emoticion/first/22.svg" width="20px" height="20px"/>',
            a23: '<img src="assets/picture/emoticion/first/23.svg" width="20px" height="20px"/>',
            a24: '<img src="assets/picture/emoticion/first/24.svg" width="20px" height="20px"/>',
            a25: '<img src="assets/picture/emoticion/first/25.svg" width="20px" height="20px"/>',
            a26: '<img src="assets/picture/emoticion/first/26.svg" width="20px" height="20px"/>',
            a27: '<img src="assets/picture/emoticion/first/27.svg" width="20px" height="20px"/>',
            a28: '<img src="assets/picture/emoticion/first/28.svg" width="20px" height="20px"/>',
            a29: '<img src="assets/picture/emoticion/first/29.svg" width="20px" height="20px"/>',
            a30: '<img src="assets/picture/emoticion/first/30.svg" width="20px" height="20px"/>',
            a31: '<img src="assets/picture/emoticion/first/31.svg" width="20px" height="20px"/>',
            a32: '<img src="assets/picture/emoticion/first/32.svg" width="20px" height="20px"/>',
            a33: '<img src="assets/picture/emoticion/first/33.svg" width="20px" height="20px"/>',
            a34: '<img src="assets/picture/emoticion/first/34.svg" width="20px" height="20px"/>',
            a35: '<img src="assets/picture/emoticion/first/35.svg" width="20px" height="20px"/>',
            a36: '<img src="assets/picture/emoticion/first/36.svg" width="20px" height="20px"/>',
            a37: '<img src="assets/picture/emoticion/first/37.svg" width="20px" height="20px"/>',
            a38: '<img src="assets/picture/emoticion/first/38.svg" width="20px" height="20px"/>',
            a39: '<img src="assets/picture/emoticion/first/39.svg" width="20px" height="20px"/>',
            a40: '<img src="assets/picture/emoticion/first/40.svg" width="20px" height="20px"/>',
            a41: '<img src="assets/picture/emoticion/first/41.svg" width="20px" height="20px"/>',
            a42: '<img src="assets/picture/emoticion/first/42.svg" width="20px" height="20px"/>',
            a43: '<img src="assets/picture/emoticion/first/43.svg" width="20px" height="20px"/>',
            a44: '<img src="assets/picture/emoticion/first/44.svg" width="20px" height="20px"/>',
            a45: '<img src="assets/picture/emoticion/first/45.svg" width="20px" height="20px"/>',
            a46: '<img src="assets/picture/emoticion/first/46.svg" width="20px" height="20px"/>',
            a47: '<img src="assets/picture/emoticion/first/47.svg" width="20px" height="20px"/>',
            a48: '<img src="assets/picture/emoticion/first/48.svg" width="20px" height="20px"/>',
            a49: '<img src="assets/picture/emoticion/first/49.svg" width="20px" height="20px"/>',
            a50: '<img src="assets/picture/emoticion/first/50.svg" width="20px" height="20px"/>',
        };

        let patterns = {
            a01: /:\)/gm,
            a02: /:joy/gm,
            a03: /:cry/gm,
            a04: /:ang/gm,
            a05: /:P/gm,
            a06: /:rang/gm,
            a07: /;\)/gm,
            a08: /:dis/gm,
            a09: /:\</gm,
            a10: /:emb/gm,
            a11: /:O/gm,
            a12: /:\(/gm,
            a13: /:x/gm,
            a14: /:\$/gm,
            a15: /:-a/gm,
            a16: /:-8/gm,
            a17: /:88/gm,
            a18: /;-sho/gm,
            a19: /:-ick/gm,
            a20: /:#/gm,
            a21: /:z/gm,
            a22: /;sur/gm,
            a23: /:o/gm,
            a24: /:h/gm,
            a25: /:-rich/gm,
            a26: /:666/gm,
            a27: /:sk/gm,
            a28: /:-c/gm,
            a29: /;-ro/gm,
            a30: /:poo/gm,
            a31: /:-s/gm,
            a32: /:g/gm,
            a33: /:-p/gm,
            a34: /:-x/gm,
            a35: /:-ey/gm,
            a36: /:-o3/gm,
            a37: /:-C/gm,
            a38: /:H/gm,
            a39: /:-%/gm,
            a40: /:T/gm, // ne radi
            a41: /:5/gm,
            a42: /:7/gm,
            a43: /;-mart/gm,
            a44: /;pss/gm,
            a45: /:D/gm,
            a46: /:y/gm, //ne radi
            a47: /:Y/gm,
            a48: /:\>/gm,
            a49: /:na/gm,
            a50: /;r/gm
        }

        return s && s.replace(patterns.a01, emoticons.a01)
            .replace(patterns.a02, emoticons.a02).replace(patterns.a18, emoticons.a18).replace(patterns.a34, emoticons.a34)
            .replace(patterns.a03, emoticons.a03).replace(patterns.a19, emoticons.a19).replace(patterns.a35, emoticons.a35)
            .replace(patterns.a04, emoticons.a04).replace(patterns.a20, emoticons.a20).replace(patterns.a36, emoticons.a36)
            .replace(patterns.a05, emoticons.a05).replace(patterns.a21, emoticons.a21).replace(patterns.a37, emoticons.a37)
            .replace(patterns.a06, emoticons.a06).replace(patterns.a22, emoticons.a22).replace(patterns.a38, emoticons.a38)
            .replace(patterns.a07, emoticons.a07).replace(patterns.a23, emoticons.a23).replace(patterns.a39, emoticons.a39)
            .replace(patterns.a08, emoticons.a08).replace(patterns.a24, emoticons.a24).replace(patterns.a40, emoticons.a40)
            .replace(patterns.a09, emoticons.a09).replace(patterns.a25, emoticons.a25).replace(patterns.a41, emoticons.a41)
            .replace(patterns.a10, emoticons.a10).replace(patterns.a26, emoticons.a26).replace(patterns.a42, emoticons.a42)
            .replace(patterns.a11, emoticons.a11).replace(patterns.a27, emoticons.a27).replace(patterns.a43, emoticons.a43)
            .replace(patterns.a12, emoticons.a12).replace(patterns.a28, emoticons.a28).replace(patterns.a44, emoticons.a44)
            .replace(patterns.a13, emoticons.a13).replace(patterns.a29, emoticons.a29).replace(patterns.a45, emoticons.a45)
            .replace(patterns.a14, emoticons.a14).replace(patterns.a30, emoticons.a30).replace(patterns.a46, emoticons.a46)
            .replace(patterns.a15, emoticons.a15).replace(patterns.a31, emoticons.a31).replace(patterns.a47, emoticons.a47)
            .replace(patterns.a16, emoticons.a16).replace(patterns.a32, emoticons.a32).replace(patterns.a48, emoticons.a48)
            .replace(patterns.a17, emoticons.a17).replace(patterns.a33, emoticons.a33).replace(patterns.a49, emoticons.a49)
            .replace(patterns.a50, emoticons.a50);
    }

    timeOfSetAddress(setDate: Date) {
        const source = timer(1000, 2000);
        let that = this;
        // setTimeout(() => {
        // }, 5000);
        // const abc = source.subscribe(val => {
        //     // this.subscribeTimer = this.timeLeft - val;
        //   });
    }

    /**
     * Metoda koja provjerada va li je addressa sacuvana ili nije u localstorage
     */
    isChangeLocation() {
        let isStatus = localStorage.getItem('address') ? true : false;
        return isStatus;
    }

    isSetChangeLocation(type: Boolean) {
        this.isChangeLocationStatus = type;
    }

    isAutoLocationStart() {
        return this.isAutoLocation;
    }

    isSetAutoLocationStart(type: Boolean) {
        this.isAutoLocation = type;
    }

    getResponse(message: String) {
        if (
            message !== 'ERROR_UNAUTHORIZED' && 
            message !== 'ERROR_NULL_POINTER_EXEPTION' &&
            message !== 'ERROR_PROFILE_NOT_VERIFY' &&
            message !== 'ERROR_SERVER_NOT_FOUND' &&
            message !== 'ERROR_EMAIL_NOT_FREE' &&
            message !== 'ERROR_NOT_SAVE_INFORMATION' &&
            message !== 'ERROR_NOT_SAVE_CONFIGURATION' &&
            message !== 'SUCCESS_CREAT_PROFILE'
        ) {
            return true;
        } else {
            return false;
        }
    }
}
