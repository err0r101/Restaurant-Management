import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service'; 

interface OrderDetails {
  name: string;
  phone: string;
  orderType: 'dine-in' | 'delivery';
  tableNumber?: string;
  address?: string;
  paymentMethod: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Navigation -->
      <nav class="bg-white shadow-lg fixed w-full top-0 z-10">
        <div class="max-w-6xl mx-auto px-4">
          <div class="flex justify-between items-center h-16">
            <button 
              (click)="router.navigate(['/cart'])" 
              class="text-blue-500 hover:text-blue-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Cart
            </button>
            <span class="text-lg font-semibold">Checkout</span>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="container mx-auto px-4 pt-20 pb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Order Summary -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
            <div class="space-y-4">
              @for (item of cartItems; track item.menuItem.id) {
                <div class="flex justify-between items-center">
                  <div>
                    <span class="font-medium">{{item.menuItem.name}}</span>
                    <span class="text-gray-600 text-sm"> × {{item.quantity}}</span>
                  </div>
                  <span>₹{{item.menuItem.price * item.quantity}}</span>
                </div>
              }
              <div class="border-t pt-4 mt-4">
                <div class="flex justify-between font-semibold">
                  <span>Total Amount:</span>
                  <span>₹{{getTotal()}}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Details Form -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4">Order Details</h2>
            <form (submit)="placeOrder($event)" class="space-y-4">
              <!-- Name Field -->
              <div>
                <label class="block text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  [(ngModel)]="orderDetails.name"
                  name="name"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
              </div>

              <!-- Phone Field -->
              <div>
                <label class="block text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  [(ngModel)]="orderDetails.phone"
                  name="phone"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
              </div>

              <!-- Order Type Selection -->
              <div>
                <label class="block text-gray-700 mb-2">Order Type</label>
                <div class="flex space-x-4">
                  <label class="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="orderType" 
                      value="dine-in"
                      [(ngModel)]="orderDetails.orderType"
                      class="mr-2">
                    <span class="text-gray-700">Dine-in</span>
                  </label>
                  <label class="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="orderType" 
                      value="delivery"
                      [(ngModel)]="orderDetails.orderType"
                      class="mr-2">
                    <span class="text-gray-700">Delivery</span>
                  </label>
                </div>
              </div>

              <!-- Conditional Fields based on Order Type -->
              @if (orderDetails.orderType === 'dine-in') {
                <div>
                  <label class="block text-gray-700 mb-2">Table Number</label>
                  <input 
                    type="text" 
                    [(ngModel)]="orderDetails.tableNumber"
                    name="tableNumber"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter your table number">
                </div>
              } @else if (orderDetails.orderType === 'delivery') {
                <div>
                  <label class="block text-gray-700 mb-2">Delivery Address</label>
                  <textarea 
                    [(ngModel)]="orderDetails.address"
                    name="address"
                    required
                    rows="3"
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter your delivery address"></textarea>
                </div>
              }

              <!-- Payment Method -->
              <div>
                <label class="block text-gray-700 mb-2">Payment Method</label>
                <select 
                  [(ngModel)]="orderDetails.paymentMethod"
                  name="paymentMethod"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
                  <option value="cash">Cash Payment</option>
                  <option value="card">Card Payment</option>
                  <option value="upi">UPI Payment</option>
                </select>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit"
                [disabled]="isProcessing || !isFormValid()"
                class="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed">
                @if (isProcessing) {
                  <svg class="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Order...
                } @else {
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Place Order
                }
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Order Success Modal -->
      @if (showSuccessModal) {
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div class="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <h2 class="text-2xl font-semibold mb-4">Order Placed Successfully!</h2>
              <p class="text-gray-600 mb-2">Thank you for your order.</p>
              <p class="text-gray-600 mb-6">Your order number is #{{orderNumber}}</p>
              <button 
                (click)="router.navigate(['/menu'])"
                class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  isProcessing: boolean = false;
  showSuccessModal: boolean = false;
  orderNumber: string = '';

  orderDetails: OrderDetails = {
    name: '',
    phone: '',
    orderType: 'delivery',
    paymentMethod: 'cash'
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    public router: Router
  ) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      if (items.length === 0) {
        this.router.navigate(['/cart']);
      }
    });
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  isFormValid(): boolean {
    if (!this.orderDetails.name || !this.orderDetails.phone || !this.orderDetails.paymentMethod) {
      return false;
    }

    if (this.orderDetails.orderType === 'dine-in' && !this.orderDetails.tableNumber) {
      return false;
    }

    if (this.orderDetails.orderType === 'delivery' && !this.orderDetails.address) {
      return false;
    }

    return true;
  }

  // checkout.component.ts
  placeOrder(event: Event) {
    event.preventDefault();
    
    if (!this.isFormValid()) {
      return;
    }

    this.isProcessing = true;

    // Get stored mobile number from login
    const userMobile = localStorage.getItem('userMobile');

    const orderData = {
      customerName: this.orderDetails.name,
      mobileNumber: userMobile || this.orderDetails.phone,
      orderType: this.orderDetails.orderType,
      tableNumber: this.orderDetails.orderType === 'dine-in' ? this.orderDetails.tableNumber : null,
      address: this.orderDetails.orderType === 'delivery' ? this.orderDetails.address : null,
      paymentMethod: this.orderDetails.paymentMethod,
      totalAmount: this.getTotal(),
      items: this.cartItems.map(item => ({
        itemName: item.menuItem.name,
        price: item.menuItem.price,
        quantity: item.quantity
      }))
    };

    console.log('Sending order data:', orderData);

    this.orderService.createOrder(orderData).subscribe({
      next: (response) => {
        console.log('Order response:', response);
        this.isProcessing = false;
        this.orderNumber = response.orderNumber;
        this.showSuccessModal = true;
        this.cartService.clearCart();
        
        setTimeout(() => {
          this.router.navigate(['/menu']);
        }, 3000);
      },
      error: (error) => {
        console.error('Error placing order:', error);
        this.isProcessing = false;
        if (error.error && error.error.message) {
          alert(error.error.message);
        } else {
          alert('Failed to place order. Please try again.');
        }
      }
    });
  }
}