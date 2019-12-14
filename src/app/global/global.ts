import { Injectable } from '@angular/core';

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
    constructor() {
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

    getOriginsIO() {
        let allowedOrigins = {

        }
        return allowedOrigins;
    }

    editLocalStorage(object: any) {
        console.info('Global.editLocalStorage() - Edit localstorage when update profile for client')
        
        var newJson = JSON.parse(localStorage.getItem('user'));

        if (object['email']) console.log('Usao ovde')
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
}
