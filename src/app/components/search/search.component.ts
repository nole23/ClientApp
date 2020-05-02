import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { SearchService } from '../../services/search.service';
import { GeolocationService } from '../../services/geolocation.service';
import { Global } from '../../global/global';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  listUsers: [User];
  searchText: String;
  loading: Boolean;
  isLoaderButton: Boolean;
  cssClass: String;
  setCity: any;
  type: any;
  options: any;
  page: any;
  constructor(
    private searchService: SearchService,
    private global: Global,
    private userService: UserService
  ) {
    this.searchText = null;
    this.loading = false;
    this.isLoaderButton = false;
    this.cssClass = 'hide';
    this.type = {
      men: false,
      women: true
    };
    this.setCity = null;
    this.options = {
      address: null,
      type: null
    }
    this.page = 0;
  }

  ngOnInit() {
    this.getAllUser();
    this.global.setSidebar('profile');
  }

  getAllUser() {
    this.loading = true;
    this.searchService.getOtherUser(this.page).subscribe(res => {
      this.listUsers = res['message'];
      this.loading = false;
    })
  }

  filter() {
    if (this.searchText.length > 2) {
      this.loading = true;
      this.searchService.searchUsers(this.searchText).subscribe((res: [User]) =>{
        this.listUsers = res['users'];
        this.loading = false;
      })
    } else if (this.searchText.length < 2) {
      this.getAllUser();
    }
  }

  addRemoveFriend(item: any, status: boolean, index: any) {
    if (status) {
      this.userService.sendRelationship(item['user']).subscribe(res => {
        if (res) {
          this.listUsers[index]['isRelationship'] = true;
          this.listUsers[index]['isResOrReq'] = true;
        }
        this.isLoaderButton = false;
      })
    } else {
      this.userService.removeRelationship(item['user']).subscribe(res => {
        this.isLoaderButton = false;
        this.listUsers[index]['isRelationship'] = false;
        this.listUsers[index]['isResOrReq'] = false;
      })
    }
  }

  acceptFriend(item: any, type: Boolean, index: any) {
    this.isLoaderButton = true;
    this.userService.acceptRelatuonship(item['user']).subscribe(res => {
      this.listUsers.splice(index, 1);
      this.isLoaderButton = false;
    })
  }

  ngOpen() {
    if (this.cssClass === 'hide') {
      this.cssClass = 'show';
    } else {
      this.cssClass = 'hide'
      this.options['address'] = this.setCity['address'];
      this.options['type'] = this.type;
    }
  }
}
