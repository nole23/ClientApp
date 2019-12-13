import { UserInformation } from './user-information';

export class User {
    _id: String;
    firstName: String;
    lastName: String;
    password: String;
    username: String;
    email: String;
    statusProfile: Boolean;
    otherInformation: UserInformation;
    constructor(user = null) {
        if (user !== null) {
            this._id = user._id;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.password = user.password;
            this.username = user.username;
            this.email = user.email;
            this.otherInformation = user.otherInformation;
        }
        
    }
}

export class UserData {
    _id: String;
    firstName: String;
    lastName: String;
    password: String;
    username: String;
    email: String;
    statusProfile: Boolean;
}
