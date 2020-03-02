import { User } from './user';

export class Images {
    user: User;
    imageLink: [Image]

    constructor(images = null) {
        this.user = images.user
        this.imageLink = images.imageLink;
    }

    settingListImages() {
        let res = [];
        for (let i = 0; i < this.imageLink.length; i++) {
            res.push({user: new User(this.user), link: new Image(this.imageLink[i])});
        }
        return res;
    }
}

export class Image {
    _id: any;
    datePublication: any;
    link: String;
    like: any;
    comment: any;

    constructor(i = null) {
        this._id = i._id;
        this.datePublication = i.datePublication;
        this.link = i.link;
        this.like = i.like;
        this.comment = i.comment;
    }
}