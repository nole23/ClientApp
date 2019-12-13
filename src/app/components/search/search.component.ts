import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  listUsers: [User];
  searchUsers: [User];
  lastUsers: [User];
  searchText: String;
  loading: Boolean;
  constructor(private searchService: SearchService) {
    this.searchText = null;
    this.searchUsers = null;
    this.loading = false;
  }

  ngOnInit() {
    console.info('SearchCompoment.ngOnInit() - Data initialization');
    this.loading = true;
    this.searchService.getOtherUser().subscribe((res: [User]) => {
      this.listUsers = res['users'];
      this.loading = false;
    })
  }

  filter() {
    console.info('SearchCompoment.filter() - Filter profile');
    if (this.searchText.length > 2) {
      this.loading = true;
      this.searchService.searchUsers(this.searchText).subscribe((res: [User]) =>{
        this.searchUsers = res['users'];
        this.loading = false;
      })
    } else {
      this.searchUsers = null;
    }
  }

}
