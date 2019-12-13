export class Settings {
    id: any;
    generalData: GeneralData;
    account: Account;
    privacy: Privacy;

    constructor(item: any) {
        if (item.id) this.id = item.id;
        if (item.generalData) this.generalData = item.generalData;
        if (item.account) this.account = item.account;
        if (item.privacy) this.privacy = item.privacy; 
    }
}

export class GeneralData {
    id: any;
    firstName: String;
    lastName: String;
    dateOfBirth: Date;
    sex: String;

    constructor(item: any) {
        if (item.id) this.id = item.id;
        if (item.firstName) this.firstName = item.firstName;
        if (item.lastName) this.lastName = item.lastName;
        if (item.dateOfBirth) this.dateOfBirth = item.dateOfBirth;
        if (item.sex) this.sex = item.sex;
    }
}

export class Privacy {
    id: any;
    whoCanSeeProfile: String;

    constructor(item: any) {
        if (item.id) this.id = item.id;
        if (item.whoCanSeeProfile) this.whoCanSeeProfile = item.whoCanSeeProfile;
    }
}