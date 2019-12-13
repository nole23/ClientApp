import { User } from './user';

export class Publication {
    _id: String;
    user: User;
    datePublication: String;
    image: String;
    text: String
    comments: [Comments];
    likes: [Likes]

    constructor(item = null) {
        if (item._id) this._id = item._id;
        this.user = item.user;
        this.datePublication = item.datePublication;
        this.image = item.image;
        this.text = item.text
        this.comments = item.comments;
        this.likes = item.likes;
    }
}

export class Comments {
    user: User;
    dateOfComments: String;
    text: String;

    constructor(item = null) {
        this.user = item.user
        this.dateOfComments = item.dateOfComments;
        this.text = item.text;
    }
}

export class Likes {
    user: User;

    constructor(item = null) {
        this.user = item.user;
    }
}