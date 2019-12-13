import { User } from '../models/user.js';

export class Online {
    user: User;
    device: []

    constructor(item: any) {
        this.user = item.user;
        this.device = item.device;
    }
}
