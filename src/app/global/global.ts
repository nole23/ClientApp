import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class Global {

    private testComponentSource = new Subject<boolean>();
    private sidebarComponentSource = new Subject<String>();
    private sidebarComponentRemoveSource = new Subject<Boolean>();
    private chatChomponentSocketMessage = new Subject<any>();
    private chatChomponentSocketTyping = new Subject<any>();
    private chatChomponentSocketIsOnline = new Subject<any>();
    private chatChomponentSocketShowMessage = new Subject<any>();
    private appComponentLogin = new Subject<any>();
    private appComponentLogout = new Subject<any>();
    testComponent$ = this.testComponentSource.asObservable();
    sidebarComponent$ = this.sidebarComponentSource.asObservable();
    sidebarComponentRemove$ = this.sidebarComponentRemoveSource.asObservable();
    chatChomponentSocketMessage$ = this.chatChomponentSocketMessage.asObservable();
    chatChomponentSocketTyping$ = this.chatChomponentSocketTyping.asObservable();
    chatChomponentSocketIsOnline$ = this.chatChomponentSocketIsOnline.asObservable();
    chatChomponentSocketShowMessage$ = this.chatChomponentSocketShowMessage.asObservable();
    appComponentLogin$ = this.appComponentLogin.asObservable();
    appComponentLogout$ = this.appComponentLogout.asObservable();

    linkLocalhostChat: String;
    linkLocalhostStatus: String;
    linkLocalhostMedia: string;
    linkLocalhost: string;
    linkWebhost: string;
    panleOptions: any;
    listSmile: any;
    smile: any;
    linkClient: any;
    simbol: any;
    isChangeLocationStatus: Boolean;
    abc: any;
    isAutoLocation: Boolean;
    linkRegExp = new RegExp (/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/);
    smileRegExp = new RegExp(/(\:\w+\:|\<[\/\\]?3|[\(\)\\\D|\*\$][\-\^]?[\:\;\=]|[\:\;\=B8][\-\^]?[3DOPp\@\$\*\\\)\(\/\|])(?=\s|[\!\.\?]|$)/)
    ytRegExp = new RegExp(/(?:https?:\/\/|www\.|m\.|^)youtu(?:be\.com\/watch\?(?:.*?&(?:amp;)?)?v=|\.be\/)([\w‌​\-]+)(?:&(?:amp;)?[\w\?=]*)?/)
    imgRegExp = new RegExp(/https?:\/\/.*\.(?:png|jpg|gif|jpeg)/)
    toMatch = new RegExp (/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i)
    numberOfMessage: any;
    me: User;
    restartEmal: String;
    constructor() {
        this.isAutoLocation = false;
        this.isChangeLocationStatus = false;
        this.simbol = [
          ':)', ':joy:', ':cry', ':ang:', ':P', ':rang:', ';)', ':dis:', ':<:', ':emb:',
          ':O', ':(', ':x:', ':$:', ':-a:', ':-8:', ':88:', ';-sho:', ':-ick:', ':#:',
          ':z', ';sur:', ':o', ':h', ':-rich:', ':666:', ':sk:', ':-c:', ';-ro:', ':poo:',
          ':-s:', ':g', ':-p:', ':-x:', ':-ey:', ':-o3:', ':-C:', ':H:', ':-%:', ':T',':5:',
          ':7:', ';-mart:', ';pss:', ':D', ':y:', ':Y:', ':>:', ':na:', ';r:', ';O:', ';q:'
        ]
        this.listSmile = [
            ['smile', 'assets/picture/emoticion/first/001.svg']
        ];
        this.smile = {
            smile: [
                "001.svg","002.svg","003.svg","004.svg","005.svg",
                "006.svg","007.svg","008.svg","009.svg","010.svg",
                "011.svg","012.svg","013.svg","014.svg","015.svg",
                "016.svg","017.svg","018.svg","019.svg","020.svg",
                "021.svg","022.svg","023.svg","024.svg","025.svg",
                "026.svg","027.svg","028.svg","029.svg","030.svg",
                "031.svg","032.svg","033.svg","034.svg","035.svg",
                "036.svg","037.svg","038.svg","039.svg","040.svg",
                "041.svg","042.svg","043.svg","044.svg","045.svg",
                "046.svg","047.svg","048.svg","049.svg","050.svg"
            ]
        };
        // this.linkLocalhostChat = 'https://twoway1.herokuapp.com/chats/api/'
        // this.linkLocalhost = 'https://twoway1.herokuapp.com/users/api/';
        // this.linkLocalhostMedia = 'https://twoway1.herokuapp.com/media/api/';
        // this.linkLocalhostStatus = 'https://twoway1.herokuapp.com/status/api/';
        // this.linkWebhost = '';
        
        this.linkLocalhostChat = '/chats/api/'
        this.linkLocalhost = '/users/api/';
        this.linkLocalhostMedia = '/media/api/';
        this.linkLocalhostStatus = '/status/api/';
        this.linkWebhost = '';

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
                    {name: 'Adresa', type: 'String', idData: ['otherInformation', 'adress'], idName: 'address'},
                    {name: 'Profesija', type: 'String', idData: ['otherInformation', 'jobs', 'name'], idName: 'name'},
                    {name: 'Gde radite?', type: 'String', idData: ['otherInformation', 'jobs', 'nameCompany'], idName: 'nameCompany'},
                    {name: 'Mesto', type: 'String', idData: ['otherInformation', 'jobs', 'places'], idName: 'places'},
                ]
            }
        }
        this.numberOfMessage = [];
        this.linkClient = '';
        this.restartEmal = null;
    }

    setLinkClient(link: String) {
        this.linkClient = link + '/images/emotion01/';
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

    getLinkClient() {
        return this.linkWebhost;
    }

    getIndexSmile(text: any) {
        let index = this.smile['smile'].indexOf(text);
        return this.simbol[index];
    }

    geIOLing(link: any) {
        let allowedOrigins = link.split('/')[0] + link.split('/')[1] + link.split('/')[2];
        return allowedOrigins;
    }

    editLocalStorage(object: any) {
        var newJson = JSON.parse(localStorage.getItem('user'));
        localStorage.removeItem('user');

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

    ngReplice(s: String, type: Boolean) {
        let css = '';
        if (!type) {
            css = 'width="40px" height="40px"'
        } else if (type) {
            css = 'width="20px" height="20px"';
        }
        let emoticons = {
            a01: '<img src="' + this.linkClient + '/001.svg"' + css + ' />',
            a02: '<img src="' + this.linkClient + '/002.svg"' + css + ' />',
            a03: '<img src="' + this.linkClient + '/003.svg"' + css + ' />',
            a04: '<img src="' + this.linkClient + '/004.svg"' + css + ' />',
            a05: '<img src="' + this.linkClient + '/005.svg"' + css + ' />',
            a06: '<img src="' + this.linkClient + '/006.svg"' + css + ' />',
            a07: '<img src="' + this.linkClient + '/007.svg"' + css + ' />',
            a08: '<img src="' + this.linkClient + '/008.svg"' + css + ' />',
            a09: '<img src="' + this.linkClient + '/009.svg"' + css + ' />',
            a10: '<img src="' + this.linkClient + '/010.svg"' + css + ' />',
            a11: '<img src="' + this.linkClient + '/011.svg"' + css + ' />',
            a12: '<img src="' + this.linkClient + '/012.svg"' + css + ' />',
            a13: '<img src="' + this.linkClient + '/013.svg"' + css + ' />',
            a14: '<img src="' + this.linkClient + '/014.svg"' + css + ' />',
            a15: '<img src="' + this.linkClient + '/015.svg"' + css + ' />',
            a16: '<img src="' + this.linkClient + '/016.svg"' + css + ' />',
            a17: '<img src="' + this.linkClient + '/017.svg"' + css + ' />',
            a18: '<img src="' + this.linkClient + '/018.svg"' + css + ' />',
            a19: '<img src="' + this.linkClient + '/019.svg"' + css + ' />',
            a20: '<img src="' + this.linkClient + '/020.svg"' + css + ' />',
            a21: '<img src="' + this.linkClient + '/021.svg"' + css + ' />',
            a22: '<img src="' + this.linkClient + '/022.svg"' + css + ' />',
            a23: '<img src="' + this.linkClient + '/023.svg"' + css + ' />',
            a24: '<img src="' + this.linkClient + '/024.svg"' + css + ' />',
            a25: '<img src="' + this.linkClient + '/025.svg"' + css + ' />',
            a26: '<img src="' + this.linkClient + '/026.svg"' + css + ' />',
            a27: '<img src="' + this.linkClient + '/027.svg"' + css + ' />',
            a28: '<img src="' + this.linkClient + '/028.svg"' + css + ' />',
            a29: '<img src="' + this.linkClient + '/029.svg"' + css + ' />',
            a30: '<img src="' + this.linkClient + '/030.svg"' + css + ' />',
            a31: '<img src="' + this.linkClient + '/031.svg"' + css + ' />',
            a32: '<img src="' + this.linkClient + '/032.svg"' + css + ' />',
            a33: '<img src="' + this.linkClient + '/033.svg"' + css + ' />',
            a34: '<img src="' + this.linkClient + '/034.svg"' + css + ' />',
            a35: '<img src="' + this.linkClient + '/035.svg"' + css + ' />',
            a36: '<img src="' + this.linkClient + '/036.svg"' + css + ' />',
            a37: '<img src="' + this.linkClient + '/037.svg"' + css + ' />',
            a38: '<img src="' + this.linkClient + '/038.svg"' + css + ' />',
            a39: '<img src="' + this.linkClient + '/039.svg"' + css + ' />',
            a40: '<img src="' + this.linkClient + '/040.svg"' + css + ' />',
            a41: '<img src="' + this.linkClient + '/041.svg"' + css + ' />',
            a42: '<img src="' + this.linkClient + '/042.svg"' + css + ' />',
            a43: '<img src="' + this.linkClient + '/043.svg"' + css + ' />',
            a44: '<img src="' + this.linkClient + '/044.svg"' + css + ' />',
            a45: '<img src="' + this.linkClient + '/045.svg"' + css + ' />',
            a46: '<img src="' + this.linkClient + '/046.svg"' + css + ' />',
            a47: '<img src="' + this.linkClient + '/047.svg"' + css + ' />',
            a48: '<img src="' + this.linkClient + '/048.svg"' + css + ' />',
            a49: '<img src="' + this.linkClient + '/049.svg"' + css + ' />',
            a50: '<img src="' + this.linkClient + '/050.svg"' + css + ' />',
        };

        let patterns = {
            a01: /:\)/gm,
            a02: /:joy:/gm,
            a03: /:cry/gm,
            a04: /:ang:/gm,
            a05: /:P/gm,
            a06: /:rang:/gm,
            a07: /;\)/gm,
            a08: /:dis:/gm,
            a09: /:\<:/gm,
            a10: /:emb:/gm,
            a11: /:O/gm,
            a12: /:\(/gm,
            a13: /:x:/gm,
            a14: /:\$:/gm,
            a15: /:-a:/gm,
            a16: /:-8:/gm,
            a17: /:88:/gm,
            a18: /;-sho:/gm,
            a19: /:-ick:/gm,
            a20: /:#:/gm,
            a21: /:z/gm,
            a22: /;sur:/gm,
            a23: /:o/gm,
            a24: /:h/gm,
            a25: /:-rich:/gm,
            a26: /:666:/gm,
            a27: /:sk:/gm,
            a28: /:-c:/gm,
            a29: /;-ro:/gm,
            a30: /:poo:/gm,
            a31: /:-s:/gm,
            a32: /:g/gm,
            a33: /:-p:/gm,
            a34: /:-x:/gm,
            a35: /:-ey:/gm,
            a36: /:-o3:/gm,
            a37: /:-C:/gm,
            a38: /:H:/gm,
            a39: /:-%:/gm,
            a40: /:T/gm, // ne radi
            a41: /:5:/gm,
            a42: /:7:/gm,
            a43: /;-mart:/gm,
            a44: /;pss:/gm,
            a45: /:D/gm,
            a46: /:y:/gm, //ne radi
            a47: /:Y:/gm,
            a48: /:\>:/gm,
            a49: /:na:/gm,
            a50: /;r:/gm
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

    getSimboles() {
        return this.simbol;
    }

    regExpLink(text: String) {
        return text.match(this.linkRegExp);
    }

    regExpSmile(text: String) {
        return text.match(this.smileRegExp);
    }

    regExpYt(text: String) {
        return text.match(this.ytRegExp);
    }

    regExpImg(text: String) {
        return text.match(this.imgRegExp);
    }

    setChatWithoutText(text: String) {
        return '<a class="btn-white-f" href="' + text + '" target="_blank">' + text + '</a>'
    }

    setChatWithText(text: String, link: String) {
        return text + '<br>' + '<a class="btn-white-f" href="' + link + '" target="_blank">' + link +'</a>'
    }

    setImageText(link: String) {
        return '<a class="btn-white-f" href="' + link + '" target="_blank">' +
                '<img class="cursor-pointer float-r bo-cir-b-l-20 bo-cir-t-l-20 bo-cir-t-r-20 bo-cir-b-r-20 fit-image w-100p h-180p" src="' +
                link + '" /></a>'
    }

    setYtText(link: String) {
        let nameYt = link.split('/')
        let nameVide = ''
        if (nameYt[0] === 'https:' || nameYt[0] === 'http:') {
            nameVide = nameYt[3]
        } else {
            let first = nameYt[1].split('&')[0];
            let name = first.split('=')[1]
            nameVide = name;
        }

        return '<div class="w-100p pos-relative h-180p">' +
                    '<a class="sizefull btn-white-f" href="' + link + '" target="_blank">' +
                        '<img class="cursor-pointer float-r bo-cir-b-l-20 bo-cir-t-l-20 bo-cir-t-r-20 bo-cir-b-r-20 fit-image w-100p h-180p" src="' +
                        'https://img.youtube.com/vi/' + nameVide + '/0.jpg" />' +
                        '<i class="fa fa-play-circle-o pos-absolute ab-c-m fa-green-h fs-50" aria-hidden="true"></i>' +
                    '</a>' +
                '</div>'
    }

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
            message !== 'SUCCESS_CREAT_PROFILE' &&
            message !== 'ERROR_NOT_FIND_ITEM'
        ) {
            return true;
        } else {
            return false;
        }
    }

    getResponseError(message: String) {
        if (
            message === 'ERROR_UNAUTHORIZED' ||
            message === 'ERROR_NULL_POINTER_EXEPTION' ||
            message === 'ERROR_PROFILE_NOT_VERIFY' ||
            message === 'ERROR_SERVER_NOT_FOUND' ||
            message === 'ERROR_EMAIL_NOT_FREE' ||
            message === 'ERROR_NOT_SAVE_INFORMATION' ||
            message === 'ERROR_NOT_SAVE_CONFIGURATION' ||
            message === 'SUCCESS_CREAT_PROFILE' ||
            message === 'ERROR_NOT_FIND_ITEM' ||
            message === 'ERROR_NOT_FIND_USER' ||
            message === 'ERROR_VERIFICATION_CODE_IS_ERROR'
        ) {
            return false;
        } else {
            return true;
        }
    }

    getResponseSuccess(message: String) {
        if (
            message === 'SUCCESS_SAVE' || 
            message === 'CREATE_PARTICIPANTS' ||
            message === 'SUCCESS_CREAT_PROFILE' ||
            message === 'SUCCESS_SAVE_REMOVE' ||
            message === 'SUCCESS_SAVE_ADD' ||
            message === 'SUCCESS_ACCEPT_NEW_FRIEND'
        ) {
            return true;
        } else {
            return false;
        }
    }

    playAudi() {
        let audio = new Audio();
        audio.src = "../../assets/sonds/insight.mp3";
        audio.load();
        audio.play();
    }

    setNumberOfMessage(id: any) {
        let index = this.numberOfMessage.indexOf(id)
        if (index === -1) {
            this.numberOfMessage.push(id);
        }
        this.testComponentSource.next(null);
    }

    getNumberOfMessage() {
        return this.numberOfMessage;
    }

    setNullOfMessage(id: any) {
        let index = this.numberOfMessage.indexOf(id)
        if (index !== -1) {
            this.numberOfMessage.splice(index, 1);
        }
        this.testComponentSource.next(null);
    }

    setSidebar(name: String) {
        this.sidebarComponentSource.next(name);
    }

    setRemoveNotification(name: any) {
        this.sidebarComponentRemoveSource.next(name);
    }

    editViewNotification(type: String) {
        let item = JSON.parse(localStorage.getItem('notification'));
        localStorage.removeItem('notification')

        if (type === 'chat') {
            
        } else {
            if (type === 'publication') {
                item.notification.isNotificaton = 0;
            } else if (type === 'visitors') {
                item.notification.isVisitor = 0;
            } else if (type === 'Requester') {
                if (item.relationship > 1) {
                    item.relationship = item.relationship - 1;
                } else {
                    item.relationship = 0;
                }
            }
        }

        localStorage.setItem('notification', JSON.stringify(item));
        this.setRemoveNotification(true)
    }

    setNewNotification(data: any, type: String) {
        let item = JSON.parse(localStorage.getItem('notification'));
        localStorage.removeItem('notification');

        if (type === 'chat') {

        } else {
            if (type.toString() === 'Requester') {
                item.relationship = item.relationship + 1;
            } else if (type.toString() === 'visitor') {
                item.notification.isVisitor = item.notification.isVisitor + 1;
            }
        }

        localStorage.setItem('notification', JSON.stringify(item));
        this.setRemoveNotification(true);
    }

    setDevice(type: any) {
        localStorage.removeItem('device');
        localStorage.setItem('device', JSON.stringify({isMobile: type}));
    }

    getSocketFromCommponent(commponent: String, type: String, data: any) {
        if (commponent === 'chat') {
            
            if (type === 'newNessage') {
                this.setNumberOfMessage(data.chat._id)
                this.chatChomponentSocketMessage.next(data);
            } else if (type === 'typing') {
                this.chatChomponentSocketTyping.next(data);
            } else if (type === 'userIsOnline') {
                this.chatChomponentSocketIsOnline.next(data);
            } else if (type === 'showMessage') {
                this.chatChomponentSocketShowMessage.next(data);
            }
        }
    }

    ngLogin(status: Boolean) {
        this.appComponentLogin.next(status);
    }

    ngLogOut() {
        this.appComponentLogout.next();
    }

    ngRestart() {
        this.appComponentLogin.next(true);
    }

    setRestartEmail(email: String) {
        this.removeRestartEmail();
        localStorage.setItem('restartEmail', JSON.stringify(email))
    }

    removeRestartEmail() {
        localStorage.removeItem('restartEmail')
    }
}
