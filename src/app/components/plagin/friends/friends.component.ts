import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  @Input() item: any;
  @Input() user: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  deleteFriends(item: User) {
    console.log(item)
  }

}
