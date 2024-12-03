// src/app/components/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { MenuItem } from '../../models/menu.model';

// src/app/components/cart/cart.component.ts
// ... (previous imports remain the same)

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Navigation Bar -->
      <nav class="bg-white shadow-lg fixed w-full top-0 z-10">
        <div class="max-w-6xl mx-auto px-4">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
              <!-- Back Button -->
              <button 
                (click)="router.navigate(['/menu'])" 
                class="text-blue-500 hover:text-blue-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Menu
              </button>
            </div>
            <!-- Cart Title with Icon -->
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span class="text-lg font-semibold">Your Cart</span>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="container mx-auto px-4 pt-20 pb-8">
        @if (cartItems.length === 0) {
          <div class="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p class="text-xl text-gray-600 mb-4">Your cart is empty</p>
            <button 
              (click)="router.navigate(['/menu'])" 
              class="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Browse Menu
            </button>
          </div>
        } @else {
          <div class="bg-white rounded-lg shadow-md p-6">
            <!-- Cart Items -->
            <div class="space-y-4">
              @for (item of cartItems; track item.menuItem.id) {
                <div class="flex items-center justify-between border-b pb-4">
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold">{{item.menuItem.name}}</h3>
                    <p class="text-gray-600">₹{{item.menuItem.price}}</p>
                  </div>
                  <div class="flex items-center space-x-4">
                    <!-- Quantity Controls -->
                    <div class="flex items-center border rounded-lg overflow-hidden">
                      <!-- Minus Button -->
                      <button 
                        (click)="decrementQuantity(item)"
                        class="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600">
                        -
                      </button>
                      
                      <span class="px-4 py-1 bg-white text-gray-700">{{item.quantity}}</span>
                      
                      <!-- Plus Button -->
                      <button 
                        (click)="incrementQuantity(item)"
                        class="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600">
                        +
                      </button>
                    </div>
                    
                    <!-- Delete Button -->
                    <button 
                      (click)="removeFromCart(item.menuItem)"
                      class="p-1 rounded-full hover:bg-red-100 text-red-500 hover:text-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              }
            </div>

            <!-- Cart Summary -->
            <div class="mt-6 border-t pt-4">
              <div class="flex justify-between text-lg font-semibold mb-4">
                <span>Total:</span>
                <span>₹{{getTotal()}}</span>
              </div>
              <div class="flex justify-between items-center">
                <!-- Clear Cart Button -->
                <button 
                  (click)="clearCart()"
                  class="inline-flex items-center text-red-500 hover:text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear Cart
                </button>
                
                <!-- Checkout Button -->
                <button 
                  (click)="checkout()"
                  class="inline-flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    public router: Router
  ) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
    });
  }

  incrementQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.menuItem, item.quantity + 1);
  }

  decrementQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.menuItem, item.quantity - 1);
    }
  }

  removeFromCart(menuItem: MenuItem) {
    this.cartService.removeFromCart(menuItem);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  checkout() {
    if (this.cartItems.length > 0) {
      this.router.navigate(['/checkout']);
    }
  }
}