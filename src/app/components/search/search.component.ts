import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { User } from '../../models/user';
import { SearchService } from '../../services/search.service';
import { UserService } from '../../services/user.service';
import { GeolocationService } from '../../services/geolocation.service';
import { Global } from '../../global/global';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private readonly notifier: NotifierService;
  
  listUsers: [User];
  searchText: String;
  loading: Boolean;
  isLoaderButton: Boolean;
  startYear: any;
  endYear: any;
  startYearChange: any;
  endYearChange: any;
  cssClass: String;
  city: String;
  listCity: any;
  setCity: any;
  type: any;
  options: any;
  page: any;
  constructor(
    notifier: NotifierService,
    private searchService: SearchService,
    private userService: UserService,
    private geolocationService: GeolocationService,
    private global: Global
  ) {
    this.notifier = notifier;
    this.searchText = null;
    this.loading = false;
    this.isLoaderButton = false;
    this.startYear = 16;
    this.endYear = 99;
    this.startYearChange = 16;
    this.endYearChange = 99;
    this.cssClass = 'hide';
    this.city = null;
    this.listCity = null;
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

  addFriend(item: any, status: boolean, index: any) {
    console.log(item)
    console.log(status)
    console.log(index)
    // this.isLoaderButton = true;
    // if (!status) {
    //   this.userService.removeRelationship(item).subscribe(res => {
    //     // this.listUsers[index]['request'] = true;
    //     // this.isLoaderButton = false;
    //     // this.notifier.notify( 'info', 'Zahtev je povucen');
    //   }, err => {
    //     this.notifier.notify( 'info', 'Server nedostupan');
    //   })
    // } else {
    //   this.userService.sendRelationship(item).subscribe(res => {
    //     // this.listUsers[index]['request'] = false;
    //     // this.isLoaderButton = false;
    //     // this.notifier.notify( 'success', 'Zahtev za prijateljstvo je poslat');
    //   }, err => {
    //     this.notifier.notify( 'info', 'Server nedostupan');
    //   })
    // }
  }

  onSliderChange(selectedValues: number[]) {
    // this.startYearChange = selectedValues[0];
    // this.endYearChange = selectedValues[1]
  }

  filterCity() {
    if (this.city.length < 2) {
      this.listCity = null;
    }
    this.geolocationService.getAddress(this.city).subscribe(res => {
      this.listCity = res['message']
    })
  }

  setiAddress(item: any) {
    this.setCity = item;
  }

  ngOpen() {
    if (this.cssClass === 'hide') {
      this.cssClass = 'show';
    } else {
      this.cssClass = 'hide'
      this.options['address'] = this.setCity['address'];
      this.options['type'] = this.type;
    }

    // console.log(this.options)
  }
}
