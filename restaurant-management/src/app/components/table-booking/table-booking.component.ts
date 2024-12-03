// src/app/components/table-booking/table-booking.component.ts
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableBookingService } from '../../services/table.service';

@Component({
  selector: 'app-table-booking',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Navigation -->
      <nav class="bg-white shadow-lg fixed w-full top-0 z-10">
        <div class="max-w-6xl mx-auto px-4">
          <div class="flex justify-between items-center h-16">
            <button 
              (click)="router.navigate(['/user-dashboard'])" 
              class="text-blue-500 hover:text-blue-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
            <span class="text-lg font-semibold">Table Booking</span>
            <button 
              (click)="toggleView()"
              class="text-blue-500 hover:text-blue-700 px-4 py-2 rounded-lg">
              {{ showBookings ? 'Book Table' : 'View Bookings' }}
            </button>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="container mx-auto px-4 pt-20 pb-8">
        @if (!showBookings) {
          <!-- Booking Form -->
          <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-semibold mb-6 text-center">Book a Table</h2>
            <form (submit)="bookTable($event)" class="space-y-4">
              <!-- Name -->
              <div>
                <label class="block text-gray-700 mb-2">Name</label>
                <input 
                  type="text"
                  [(ngModel)]="bookingDetails.customerName"
                  name="customerName"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
              </div>

              <!-- Date -->
              <div>
                <label class="block text-gray-700 mb-2">Date</label>
                <input 
                  type="date"
                  [(ngModel)]="bookingDetails.date"
                  name="date"
                  [min]="minDate"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
              </div>

              <!-- Time -->
              <div>
                <label class="block text-gray-700 mb-2">Time</label>
                <input 
                  type="time"
                  [(ngModel)]="bookingDetails.time"
                  name="time"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
              </div>

              <!-- Number of People -->
              <div>
                <label class="block text-gray-700 mb-2">Number of People</label>
                <select 
                  [(ngModel)]="bookingDetails.numberOfPeople"
                  name="numberOfPeople"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
                  <option [ngValue]="null">Select number of people</option>
                  @for (num of [1,2,3,4,5,6,7,8,9,10]; track num) {
                    <option [value]="num">{{num}} {{num === 1 ? 'person' : 'people'}}</option>
                  }
                </select>
              </div>

              <!-- Special Requests -->
              <div>
                <label class="block text-gray-700 mb-2">Special Requests (Optional)</label>
                <textarea 
                  [(ngModel)]="bookingDetails.specialRequests"
                  name="specialRequests"
                  rows="3"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Any special requests?"></textarea>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit"
                [disabled]="loading"
                class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 disabled:bg-gray-400">
                {{loading ? 'Processing...' : 'Book Table'}}
              </button>
            </form>
          </div>
        } @else {
          <!-- Bookings List -->
          @if (loadingBookings) {
            <div class="flex justify-center items-center py-8">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          } @else if (error) {
            <div class="text-center py-8">
              <p class="text-red-500">{{error}}</p>
              <button 
                (click)="loadBookings()"
                class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Try Again
              </button>
            </div>
          } @else if (bookings.length === 0) {
            <div class="text-center py-8">
              <div class="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
                <h3 class="text-xl font-medium text-gray-900 mb-2">No Bookings Found</h3>
                <p class="text-gray-500 mb-4">You haven't made any table bookings yet.</p>
                <button 
                  (click)="toggleView()"
                  class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                  Book a Table
                </button>
              </div>
            </div>
          } @else {
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              @for (booking of bookings; track booking.id) {
                <div class="bg-white rounded-lg shadow-md p-6">
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <h3 class="text-lg font-semibold">{{booking.customerName}}</h3>
                      <p class="text-sm text-gray-500">
                        {{booking.bookingDateTime | date:'medium'}}
                      </p>
                    </div>
                    <span 
                      [class]="getStatusClass(booking.status)"
                      class="px-3 py-1 rounded-full text-sm font-medium">
                      {{booking.status}}
                    </span>
                  </div>
                  <div class="space-y-2">
                    <p class="text-gray-600">
                      <span class="font-medium">People:</span> {{booking.numberOfPeople}}
                    </p>
                    @if (booking.specialRequests) {
                      <p class="text-gray-600">
                        <span class="font-medium">Special Requests:</span><br>
                        {{booking.specialRequests}}
                      </p>
                    }
                  </div>
                  @if (booking.status === 'PENDING') {
                    <button 
                      (click)="cancelBooking(booking.id)"
                      class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200">
                      Cancel Booking
                    </button>
                  }
                </div>
              }
            </div>
          }
        }
      </div>

      <!-- Success Modal -->
      @if (showSuccessModal) {
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div class="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <h2 class="text-2xl font-semibold mb-4">Table Booked Successfully!</h2>
              <p class="text-gray-600 mb-6">
                Your booking request has been received and is pending confirmation.
              </p>
              <button 
                (click)="showSuccessModal = false; loadBookings(); showBookings = true;"
                class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                View Bookings
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `
})

export class TableBookingComponent implements OnInit {
  bookingDetails = {
    customerName: '',
    date: '',
    time: '',
    numberOfPeople: null as number | null,
    specialRequests: ''
  };

  bookings: any[] = [];
  showBookings = false;
  loadingBookings = false;
  loading = false;
  showSuccessModal = false;
  error: string = '';
  minDate: string;
  private isBrowser: boolean;

  constructor(
    private tableBookingService: TableBookingService,
    public router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.minDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit() {
    if (this.isBrowser) {
      const userName = localStorage.getItem('userName');
      if (userName) {
        this.bookingDetails.customerName = userName;
      }
      this.loadBookings();
    }
  }

  toggleView() {
    this.showBookings = !this.showBookings;
    if (this.showBookings) {
      this.loadBookings();
    }
  }

  loadBookings() {
    if (!this.isBrowser) return;

    const mobileNumber = localStorage.getItem('userMobile');
    if (!mobileNumber) {
      this.error = 'Please login to view bookings';
      return;
    }

    this.loadingBookings = true;
    this.error = '';

    this.tableBookingService.getBookingsByPhone(mobileNumber).subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.loadingBookings = false;
      },
      error: (error) => {
        console.error('Error loading bookings:', error);
        this.error = 'Failed to load bookings';
        this.loadingBookings = false;
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  cancelBooking(bookingId: number) {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.tableBookingService.cancelBooking(bookingId).subscribe({
        next: () => {
          this.loadBookings(); // Reload bookings after cancellation
        },
        error: (error) => {
          console.error('Error cancelling booking:', error);
          alert('Failed to cancel booking. Please try again.');
        }
      });
    }
  }

  bookTable(event: Event) {
    event.preventDefault();
    
    if (!this.validateForm()) {
      return;
    }

    this.loading = true;

    // Combine date and time
    const dateTime = new Date(`${this.bookingDetails.date}T${this.bookingDetails.time}`);
    const mobileNumber = localStorage.getItem('userMobile');

    const bookingData = {
      customerName: this.bookingDetails.customerName,
      mobileNumber: mobileNumber,
      bookingDateTime: dateTime.toISOString(),
      numberOfPeople: this.bookingDetails.numberOfPeople,
      specialRequests: this.bookingDetails.specialRequests
    };

    this.tableBookingService.createBooking(bookingData).subscribe({
      next: (response) => {
        this.loading = false;
        this.showSuccessModal = true;
      },
      error: (error) => {
        this.loading = false;
        alert('Failed to book table. Please try again.');
        console.error('Booking error:', error);
      }
    });
  }

  private validateForm(): boolean {
    if (!this.bookingDetails.customerName) {
      alert('Please enter your name');
      return false;
    }
    if (!this.bookingDetails.date) {
      alert('Please select a date');
      return false;
    }
    if (!this.bookingDetails.time) {
      alert('Please select a time');
      return false;
    }
    if (!this.bookingDetails.numberOfPeople) {
      alert('Please select number of people');
      return false;
    }
    return true;
  }
}