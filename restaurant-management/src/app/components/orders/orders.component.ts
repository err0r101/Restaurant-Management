// src/app/components/orders/orders.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Navigation Bar -->
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
            <span class="text-lg font-semibold">Your Orders</span>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="container mx-auto px-4 pt-20 pb-8">
        @if (loading) {
          <div class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        } @else if (error) {
          <div class="text-center py-8">
            <p class="text-red-500">{{error}}</p>
            <button 
              (click)="loadOrders()"
              class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Try Again
            </button>
          </div>
        } @else if (orders.length === 0) {
          <div class="text-center py-8">
            <div class="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 class="text-xl font-medium text-gray-900 mb-2">No Orders Yet</h3>
              <p class="text-gray-500 mb-4">Looks like you haven't placed any orders yet.</p>
              <button 
                (click)="router.navigate(['/menu'])"
                class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                Browse Menu
              </button>
            </div>
          </div>
        } @else {
          <div class="space-y-4">
            @for (order of orders; track order.id) {
              <div class="bg-white rounded-lg shadow-md p-6">
                <!-- Order Header -->
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-semibold">#{{order.orderNumber}}</h3>
                    <p class="text-sm text-gray-500">{{order.orderDate | date:'medium'}}</p>
                  </div>
                  <span class="px-3 py-1 rounded-full text-sm font-medium"
                        [ngClass]="getStatusClass(order.status)">
                    {{order.status}}
                  </span>
                </div>

                <!-- Order Items -->
                <div class="border-t border-b py-4 mb-4">
                  @for (item of order.items; track item.id) {
                    <div class="flex justify-between items-center mb-2">
                      <div class="flex items-center">
                        <span class="text-gray-800">{{item.itemName}}</span>
                        <span class="text-gray-500 mx-2">×</span>
                        <span class="text-gray-800">{{item.quantity}}</span>
                      </div>
                      <span class="text-gray-800">₹{{item.price * item.quantity}}</span>
                    </div>
                  }
                </div>

                <!-- Order Footer -->
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-sm text-gray-600">
                      @if (order.orderType === 'dine-in') {
                        <span class="font-medium">Table Number:</span> {{order.tableNumber}}
                      } @else {
                        <span class="font-medium">Delivery Address:</span> {{order.address}}
                      }
                    </p>
                    <p class="text-sm text-gray-600">
                      <span class="font-medium">Payment Method:</span> {{order.paymentMethod}}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-gray-600">Total Amount</p>
                    <p class="text-lg font-semibold">₹{{order.totalAmount}}</p>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(
    private orderService: OrderService,
    public router: Router
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.error = '';

    const mobileNumber = localStorage.getItem('userMobile');
    if (!mobileNumber) {
      this.error = 'Please login to view orders';
      this.loading = false;
      return;
    }

    this.orderService.getOrdersByPhone(mobileNumber).subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.error = 'Failed to load orders. Please try again.';
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-purple-100 text-purple-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'delivered':
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}