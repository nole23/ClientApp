import { User } from '../models/user.js';

export class Online {
    user: User;
    device: [];
    numberOfMessage: Number

    constructor(item: any) {
        this.user = item.user;
        this.device = item.device;
        this.numberOfMessage = item.numberOfMessage;
    }
}
