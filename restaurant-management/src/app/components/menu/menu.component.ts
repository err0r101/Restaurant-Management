// src/app/components/menu/menu.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { CartService } from '../../services/cart.service';
import { MenuItem } from '../../models/menu.model';

@Component({
  selector: 'app-menu',
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
                (click)="router.navigate(['/user-dashboard'])" 
                class="text-blue-500 hover:text-blue-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
            </div>
            
            <!-- Cart Button with Icon -->
            <button 
              (click)="router.navigate(['/cart'])"
              class="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 flex items-center">
              <div class="relative">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                @if (cartItemCount > 0) {
                  <span class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {{cartItemCount}}
                  </span>
                }
              </div>
              <span class="ml-2 text-gray-600 hover:text-blue-500">Cart</span>
            </button>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="container mx-auto px-4 pt-20 pb-8 max-w-[1200px]">
        <h1 class="text-3xl font-bold mb-8">Our Menu</h1>

        <!-- Category Filters -->
        <div class="flex flex-wrap gap-2 mb-8">
          @for (category of categories; track category) {
            <button 
              (click)="filterByCategory(category)"
              [class.bg-blue-500]="selectedCategory === category"
              [class.text-white]="selectedCategory === category"
              class="px-4 py-2 rounded-full border border-blue-500 hover:bg-blue-100 transition duration-200">
              {{category}}
            </button>
          }
        </div>

        @if (loading) {
          <!-- Loading Skeleton -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (item of [1,2,3,4,5,6]; track item) {
              <div class="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div class="h-48 bg-gray-200 rounded mb-4"></div>
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            }
          </div>
        } @else if (error) {
          <!-- Error Message -->
          <div class="text-center py-8">
            <p class="text-red-500">{{error}}</p>
            <button 
              (click)="loadMenuItems()"
              class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Try Again
            </button>
          </div>
        } @else {
          <!-- Menu Items Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (item of filteredItems; track item.id) {
              <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
                @if (item.imageUrl) {
                  <img [src]="item.imageUrl" [alt]="item.name" class="w-full h-48 object-cover">
                } @else {
                  <div class="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                }
                
                <div class="p-4">
                  <h3 class="text-xl font-semibold mb-2">{{item.name}}</h3>
                  <p class="text-gray-600 mb-4">{{item.description}}</p>
                  <div class="flex justify-between items-center">
                    <span class="text-lg font-bold">₹{{item.price}}</span>
                    @if (item.available) {
                      <button 
                        (click)="addToCart(item)"
                        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add to Cart
                      </button>
                    } @else {
                      <span class="text-red-500">Not Available</span>
                    }
                  </div>
                </div>
              </div>
            }
          </div>

          @if (filteredItems.length === 0) {
            <div class="text-center py-8">
              <p class="text-gray-500">No items found in this category</p>
            </div>
          }
        }
      </div>

      <!-- Add to Cart Success Message -->
      @if (showAddedToCart) {
        <div class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-500"
             [class.opacity-0]="fadeOutAddedToCart">
          Item added to cart!
        </div>
      }
    </div>
  `,
  styles: [`
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: .5; }
    }
  `]
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  filteredItems: MenuItem[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';
  loading: boolean = true;
  error: string = '';
  cartItemCount: number = 0;
  showAddedToCart: boolean = false;
  fadeOutAddedToCart: boolean = false;

  constructor(
    private menuService: MenuService,
    private cartService: CartService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadCategories();
    this.loadMenuItems();
    this.cartService.getCart().subscribe(items => {
      this.cartItemCount = items.reduce((count, item) => count + item.quantity, 0);
    });
  }

  loadCategories() {
    this.menuService.getCategories().subscribe({
      next: (categories) => {
        this.categories = ['All', ...categories];
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.error = 'Failed to load categories';
      }
    });
  }

  loadMenuItems() {
    this.loading = true;
    this.error = '';
    
    this.menuService.getAllMenuItems().subscribe({
      next: (items) => {
        this.menuItems = items;
        this.filterByCategory(this.selectedCategory);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading menu items:', error);
        this.error = 'Failed to load menu items. Please try again.';
        this.loading = false;
      }
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.loading = true;
    
    if (category === 'All') {
      this.menuService.getAllMenuItems().subscribe({
        next: (items) => {
          this.filteredItems = items;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading items:', error);
          this.error = 'Failed to load items';
          this.loading = false;
        }
      });
    } else {
      this.menuService.getItemsByCategory(category).subscribe({
        next: (items) => {
          this.filteredItems = items;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading items:', error);
          this.error = 'Failed to load items';
          this.loading = false;
        }
      });
    }
  }

  addToCart(item: MenuItem) {
    this.cartService.addToCart(item);
    this.showAddToCartMessage();
  }

  private showAddToCartMessage() {
    // Reset the state
    this.showAddedToCart = false;
    this.fadeOutAddedToCart = false;
    
    // Show the message
    setTimeout(() => {
      this.showAddedToCart = true;
      
      // Start fade out after 2 seconds
      setTimeout(() => {
        this.fadeOutAddedToCart = true;
        
        // Hide completely after fade out animation (0.5s)
        setTimeout(() => {
          this.showAddedToCart = false;
        }, 500);
      }, 2000);
    }, 100);
  }
}