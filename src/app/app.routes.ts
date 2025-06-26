import { Routes } from '@angular/router';
import { Search } from './pages/search/search';
import { SearchResult } from './pages/search-result/search-result';
import { BookTicket } from './pages/book-ticket/book-ticket';
import { MyBookings } from './pages/my-bookings/my-bookings';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
  {
    path: 'search',
    component: Search,
  },
  {
    path: 'search-result/:fromId/:toId/:date',
    component: SearchResult,
  },
  {
    path: 'book-ticket/:scheduleId',
    component: BookTicket,
  },
  {
    path: 'my-bookings',
    component: MyBookings,
  },
];
