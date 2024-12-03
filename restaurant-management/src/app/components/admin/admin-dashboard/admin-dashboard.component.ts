// src/app/components/admin/admin-dashboard/admin-dashboard.component.ts
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Navigation -->
      <nav class="bg-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex justify-between items-center h-16">
            <span class="text-xl font-semibold text-gray-900">Admin Dashboard</span>
            <button 
              (click)="logout()" 
              class="text-red-500 hover:text-red-700">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Menu Management -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <!-- Menu Icon -->
                  <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900">Menu Management</h3>
                  <p class="mt-1 text-sm text-gray-600">Manage menu items</p>
                  <button 
                    (click)="router.navigate(['/admin/menu'])"
                    class="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Manage Menu
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Orders Management -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <!-- Order Icon -->
                  <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900">Orders</h3>
                  <p class="mt-1 text-sm text-gray-600">Manage orders</p>
                  <button 
                    (click)="router.navigate(['/admin/orders'])"
                    class="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    View Orders
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Users Management -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <!-- Users Icon -->
                  <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900">Users</h3>
                  <p class="mt-1 text-sm text-gray-600">View user details</p>
                  <button 
                    (click)="router.navigate(['/admin/users'])"
                    class="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    View Users
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Table Bookings -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <!-- Table Icon -->
                  <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900">Table Bookings</h3>
                  <p class="mt-1 text-sm text-gray-600">Manage reservations</p>
                  <button 
                    (click)="router.navigate(['/admin/bookings'])"
                    class="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    View Bookings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (!localStorage.getItem('adminToken')) {
        this.router.navigate(['/admin/login']);
      }
    } 
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('adminToken');
    }
    this.router.navigate(['/admin/login']);
  }
}