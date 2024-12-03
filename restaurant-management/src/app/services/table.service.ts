// src/app/services/table-booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableBookingService {
  private baseUrl = 'http://localhost:8080/api/table-bookings';

  constructor(private http: HttpClient) {}

  createBooking(bookingData: any): Observable<any> {
    return this.http.post(this.baseUrl, bookingData);
  }

  getBookingsByPhone(mobileNumber: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${mobileNumber}`);
  }

  cancelBooking(bookingId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${bookingId}/cancel`, {});
  }
}