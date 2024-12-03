import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Navigation Bar -->
      <nav class="bg-white shadow-lg">
        <div class="max-w-6xl mx-auto px-4">
          <div class="flex justify-between items-center h-16">
            <span class="text-xl font-semibold">Restaurant App</span>
            <button 
              (click)="logout()" 
              class="text-red-500 hover:text-red-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Menu Card -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium text-gray-900">View Menu</h3>
              <p class="mt-1 text-sm text-gray-600">
                Browse our delicious menu items
              </p>
              <button 
                (click)="router.navigate(['/menu'])" 
                class="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                View Menu
              </button>
            </div>
          </div>

          <!-- Order Food Card -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium text-gray-900">View Orders</h3>
              <p class="mt-1 text-sm text-gray-600">
                Check your order history
              </p>
              <button 
                (click)="router.navigate(['/orders'])" 
                class="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                View Orders
              </button>
            </div>
          </div>

          <!-- Book Table Card -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium text-gray-900">Book Table</h3>
              <p class="mt-1 text-sm text-gray-600">
                Reserve a table for dining
              </p>
              <button 
                (click)="router.navigate(['/book-table'])" 
                class="mt-3 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UserDashboardComponent {
  constructor(public router: Router) {}

  logout() {
    localStorage.removeItem('userMobile');
    this.router.navigate(['/login']);
  }
}