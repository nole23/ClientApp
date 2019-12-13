import { User } from './user';

export class Images {
    user: User;
    imageLink: [Image]

    constructor(images = null) {
        this.user = images.user
        this.imageLink = images.images;
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
    image: String;

    constructor(i = null) {
        this.image = i.image;
    }
}