// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-3 sm:max-w-xl sm:mx-auto">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div class="max-w-md mx-auto">
            <div class="divide-y divide-gray-200">
              <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div class="text-center mb-8">
                  <h1 class="text-3xl font-bold text-blue-600">Welcome Back!</h1>
                  <p class="text-gray-500 mt-2">Log in to your account</p>
                </div>

                <!-- Error Message -->
                @if (error) {
                  <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span class="block sm:inline">{{error}}</span>
                  </div>
                }

                @if (!otpSent) {
                  <!-- Mobile Number Input -->
                  <div class="relative">
                    <input 
                      type="tel" 
                      [(ngModel)]="mobileNumber"
                      class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                      placeholder="Mobile Number"
                      [disabled]="loading">
                    <label 
                      class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all
                            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
                            peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Mobile Number
                    </label>
                  </div>

                  <!-- Send OTP Button -->
                  <div class="relative mt-6">
                    <button 
                      (click)="sendOTP()"
                      [disabled]="loading || !mobileNumber"
                      class="w-full bg-blue-600 text-white rounded-md px-6 py-2 hover:bg-blue-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed">
                      @if (loading) {
                        <span class="flex items-center justify-center">
                          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending OTP...
                        </span>
                      } @else {
                        Send OTP
                      }
                    </button>
                  </div>
                } @else {
                  <!-- OTP Input -->
                  <div class="relative">
                    <input 
                      type="text" 
                      [(ngModel)]="otp"
                      class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                      placeholder="Enter OTP"
                      [disabled]="loading"
                      maxlength="6">
                    <label 
                      class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all
                            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
                            peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Enter OTP
                    </label>
                  </div>

                  <!-- Verify OTP Button -->
                  <div class="relative mt-6">
                    <button 
                      (click)="verifyOTP()"
                      [disabled]="loading || !otp"
                      class="w-full bg-blue-600 text-white rounded-md px-6 py-2 hover:bg-blue-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed">
                      @if (loading) {
                        <span class="flex items-center justify-center">
                          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Verifying...
                        </span>
                      } @else {
                        Verify OTP
                      }
                    </button>

                    <!-- Resend OTP -->
                    <div class="text-center mt-4">
                      <button 
                        (click)="resendOTP()"
                        [disabled]="loading"
                        class="text-blue-600 hover:text-blue-700 text-sm">
                        Resend OTP
                      </button>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  mobileNumber: string = '';
  otp: string = '';
  otpSent: boolean = false;
  loading: boolean = false;
  error: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  sendOTP() {
    if (!this.mobileNumber) {
      this.error = 'Please enter mobile number';
      return;
    }

    this.loading = true;
    this.error = '';

    this.http.post('http://localhost:8080/api/auth/generate-otp', { mobileNumber: this.mobileNumber })
      .subscribe({
        next: (response: any) => {
          this.otpSent = true;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error sending OTP:', error);
          this.error = 'Failed to send OTP. Please try again.';
          this.loading = false;
        }
      });
  }

  verifyOTP() {
    if (!this.otp) {
      this.error = 'Please enter OTP';
      return;
    }

    this.loading = true;
    this.error = '';

    this.http.post('http://localhost:8080/api/auth/verify-otp', {
      mobileNumber: this.mobileNumber,
      otp: this.otp
    }).subscribe({
      next: (response: any) => {
        // Store mobile number for future use
        localStorage.setItem('userMobile', this.mobileNumber);
        
        // Navigate to user dashboard
        this.router.navigate(['/user-dashboard']);
      },
      error: (error) => {
        console.error('Error verifying OTP:', error);
        this.error = 'Invalid OTP. Please try again.';
        this.loading = false;
      }
    });
  }

  resendOTP() {
    this.otpSent = false;
    this.otp = '';
    this.sendOTP();
  }
}