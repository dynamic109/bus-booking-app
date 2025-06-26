import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ISearchBus, SearchModel } from '../../model/model';
import { HttpClient } from '@angular/common/http';
import { Search } from '../../service/search';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-search-result',
  imports: [DatePipe, RouterLink, NgIf],
  templateUrl: './search-result.html',
  styleUrl: './search-result.css',
})
export class SearchResult {
  activatedRoute = inject(ActivatedRoute);
  http = inject(HttpClient);
  searchService = inject(Search);
  searchData: ISearchBus[] = [];
  searchObj: SearchModel = new SearchModel();
  isLoading: boolean = true;

  constructor() {
    this.activatedRoute.params.subscribe((res: any) => {
      debugger;

      this.searchObj.fromLocationId = res.fromId;
      this.searchObj.toLocationId = res.toId;
      this.searchObj.date = res.date;
      this.getSearchResult();
    });
  }

  getSearchResult() {
    this.searchService
      .searchBus(
        this.searchObj.fromLocationId,
        this.searchObj.toLocationId,
        this.searchObj.date
      )
      .subscribe((res: any) => {
        this.searchData = res;
        this.isLoading = false;
        debugger;
      });
  }

  // navigateToBooking(id: number) {
  //   this.router.navigate(['book-ticket', this.searchData.s]);
  // }
}
