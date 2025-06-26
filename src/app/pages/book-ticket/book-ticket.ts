import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Search } from '../../service/search';
import { Booking, BusBookingPassenger, IScheduleData } from '../../model/model';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-ticket',
  imports: [DatePipe, NgClass, FormsModule],
  templateUrl: './book-ticket.html',
  styleUrl: './book-ticket.css',
})
export class BookTicket {
  activatedRouter = inject(ActivatedRoute);
  searchService = inject(Search);
  scheduleData!: IScheduleData;
  seatNoList: number[] = [];
  selectedSeatArray: BusBookingPassenger[] = [];
  bookTicketObj: Booking = new Booking();
  bookedSeatsList: number[] = [];

  constructor() {
    this.activatedRouter.params.subscribe((res: any) => {
      debugger;
      const scheduleId = res.scheduleId;
      this.bookTicketObj.custId = 10827;
      this.bookTicketObj.scheduleId = scheduleId;
      this.bookTicketObj.bookingDate = new Date();
      this.getBusDetails(scheduleId);
      this.getBookedSeats(scheduleId);
    });
  }

  getBusDetails(scheduleId: number) {
    this.searchService
      .getBusScheduleById(scheduleId)
      .subscribe((res: IScheduleData) => {
        this.scheduleData = res;

        for (let i = 1; i <= this.scheduleData.totalSeats; i++) {
          this.seatNoList.push(i);
          console.log(this.seatNoList);
        }
      });
  }

  getBookedSeats(scheduleId: number) {
    this.searchService.getBookedSeats(scheduleId).subscribe((res: any) => {
      this.bookedSeatsList = res;
    });
  }

  checkIfSeatIsSelected(seatNo: number) {
    const check = this.selectedSeatArray.find((m) => m.seatNo == seatNo);
    if (check == undefined) {
      return false;
    } else {
      return true;
    }
  }

  checkIfSeatIsBooked(seatNo: number) {
    const check = this.bookedSeatsList.find((m) => m == seatNo);
    if (check == undefined) {
      return false;
    } else {
      return true;
    }
  }

  onSelect(seatNo: number) {
    const isExistIndex = this.selectedSeatArray.findIndex(
      (m) => m.seatNo == seatNo
    );
    if (isExistIndex != -1) {
      this.selectedSeatArray.splice(isExistIndex, 1);
    } else {
      const newPassengerData: BusBookingPassenger = {
        seatNo: seatNo,
        age: 0,
        bookingId: 0,
        gender: '',
        passengerName: '',
        passengerId: 0,
      };
      this.selectedSeatArray.push(newPassengerData);
    }
  }

  bookTicket() {
    this.bookTicketObj.busBookingPassengers = this.selectedSeatArray;
    this.searchService
      .createNewBooking(this.bookTicketObj)
      .subscribe((res: any) => {
        alert('Ticket booked successfully');
      });
  }
}
