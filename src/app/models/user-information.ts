import { NumberValueAccessor } from '@angular/forms/src/directives';

export class UserInformation {
    _id: String;
    sex: String;
    publicMedia: Media;
    dateOfCreation: Number;
    dateOfBirth: Number;
    address: Address;
    verificationToken: String;

}

export class Media {
    profileImage: String;
    coverPhoto: String;
}

export class Address {
    country: String;
    region: String;
    city: String;
}
