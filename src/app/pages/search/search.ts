import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { SearchModel } from '../../model/model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  http = inject(HttpClient);
  router = inject(Router);
  locationList: any[] = [];

  searchObj: SearchModel = new SearchModel();

  ngOnInit(): void {
    debugger;
    this.getAllLocations();
  }

  getAllLocations() {
    debugger;
    this.http
      .get('https://api.freeprojectapi.com/api/BusBooking/GetBusLocations')
      .subscribe((res: any) => {
        debugger;
        this.locationList = res;
      });
  }

  searchBus() {
    this.router.navigate([
      'search-result',
      this.searchObj.fromLocationId,
      this.searchObj.toLocationId,
      this.searchObj.date,
    ]);

    // this.http
    //   .get(
    //     'https://api.freeprojectapi.com/api/BusBooking/searchBus2?fromLocation=' +
    //       this.searchObj.fromLocationId +
    //       '&toLocation=' +
    //       this.searchObj.toLocationId +
    //       '&travelDate=' +
    //       this.searchObj.date +
    //       ''
    //   )
    //   .subscribe((res: any) => {
    //     debugger;
    //   });
  }
}
