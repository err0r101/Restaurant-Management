// src/app/services/cart.service.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { MenuItem } from '../models/menu.model';

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    if (this.isBrowser) {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          this.cartItems = JSON.parse(savedCart);
          this.cartSubject.next(this.cartItems);
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }

  getCart() {
    return this.cartSubject.asObservable();
  }

  addToCart(menuItem: MenuItem) {
    const existingItem = this.cartItems.find(item => item.menuItem.id === menuItem.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ menuItem, quantity: 1 });
    }
    
    this.updateCart();
  }

  removeFromCart(menuItem: MenuItem) {
    this.cartItems = this.cartItems.filter(item => item.menuItem.id !== menuItem.id);
    this.updateCart();
  }

  updateQuantity(menuItem: MenuItem, quantity: number) {
    const item = this.cartItems.find(item => item.menuItem.id === menuItem.id);
    if (item) {
      item.quantity = quantity;
      if (quantity <= 0) {
        this.removeFromCart(menuItem);
      } else {
        this.updateCart();
      }
    }
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => 
      total + (item.menuItem.price * item.quantity), 0);
  }

  getCartItemsCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  private updateCart() {
    this.cartSubject.next(this.cartItems);
    if (this.isBrowser) {
      try {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }
}