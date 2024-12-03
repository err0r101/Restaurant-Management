// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Admin authentication
  adminLogin(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/login`, { username, password });
  }

  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem('adminToken');
  }

  adminLogout(): void {
    localStorage.removeItem('adminToken');
  }

  // User authentication
  userLogin(mobileNumber: string, otp: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/verify-otp`, {
      mobileNumber,
      otp
    });
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('userMobile');
  }

  userLogout(): void {
    localStorage.removeItem('userMobile');
  }
}