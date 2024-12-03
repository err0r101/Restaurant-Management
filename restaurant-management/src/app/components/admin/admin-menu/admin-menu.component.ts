// src/app/components/admin/admin-menu/admin-menu.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { MenuService } from '../../../services/menu.service';


@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Header -->
      <nav class="bg-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4 py-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <button 
                (click)="router.navigate(['/admin/dashboard'])" 
                class="text-blue-500 hover:text-blue-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </button>
              <h1 class="text-2xl font-bold ml-4">Menu Management</h1>
            </div>
            <button 
              (click)="openAddModal()"
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add New Item
            </button>
          </div>
        </div>
      </nav>

      <!-- Menu Items Table -->
      <div class="max-w-7xl mx-auto mt-6 px-4">
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              @for (item of menuItems; track item.id) {
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">{{item.name}}</td>
                  <td class="px-6 py-4">{{item.description}}</td>
                  <td class="px-6 py-4 whitespace-nowrap">₹{{item.price}}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{item.category}}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span [class]="item.available ? 'text-green-600' : 'text-red-600'">
                      {{item.available ? 'Available' : 'Not Available'}}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button (click)="editItem(item)" class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button (click)="deleteItem(item.id)" class="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Add/Edit Modal -->
      @if (showModal) {
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div class="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 class="text-2xl font-bold mb-4">{{editingItem ? 'Edit' : 'Add'}} Menu Item</h2>
            <form (submit)="saveItem($event)">
              <!-- Name -->
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input 
                  type="text" 
                  [(ngModel)]="formData.name" 
                  name="name"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
              </div>

              <!-- Description -->
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea 
                  [(ngModel)]="formData.description" 
                  name="description"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="3"
                  required
                ></textarea>
              </div>

              <!-- Price -->
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Price</label>
                <input 
                  type="number" 
                  [(ngModel)]="formData.price" 
                  name="price"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
              </div>

              <!-- Category -->
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Category</label>
                <select 
                  [(ngModel)]="formData.category" 
                  name="category"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select Category</option>
                  @for (category of categories; track category) {
                    <option [value]="category">{{category}}</option>
                  }
                </select>
              </div>

              <!-- Available -->
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  <input 
                    type="checkbox" 
                    [(ngModel)]="formData.available" 
                    name="available"
                    class="mr-2"
                  >
                  Available
                </label>
              </div>

              <!-- Image URL -->
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Image URL (Optional)</label>
                <input 
                  type="text" 
                  [(ngModel)]="formData.imageUrl" 
                  name="imageUrl"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
              </div>

              <!-- Buttons -->
              <div class="flex justify-end space-x-2">
                <button 
                  type="button"
                  (click)="closeModal()"
                  class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {{editingItem ? 'Update' : 'Add'}} Item
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `
})
export class AdminMenuComponent implements OnInit {
  menuItems: any[] = [];
  showModal = false;
  editingItem: any = null;
  categories = ['Starters', 'Main Course', 'Desserts', 'Beverages'];
  formData = {
    name: '',
    description: '',
    price: 0,
    category: '',
    available: true,
    imageUrl: ''
  };

  constructor(
    private adminService: AdminService,
    public router: Router
  ) {}

  ngOnInit() {
    this.loadMenuItems();
  }

  loadMenuItems() {
    this.adminService.getAllMenuItems().subscribe({
      next: (items) => {
        this.menuItems = items;
      },
      error: (error) => {
        console.error('Error loading menu items:', error);
        alert('Failed to load menu items');
      }
    });
  }

  openAddModal() {
    this.editingItem = null;
    this.formData = {
      name: '',
      description: '',
      price: 0,
      category: '',
      available: true,
      imageUrl: ''
    };
    this.showModal = true;
  }

  editItem(item: any) {
    this.editingItem = item;
    this.formData = { ...item };
    this.showModal = true;
  }

  deleteItem(id: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.adminService.deleteMenuItem(id).subscribe({
        next: () => {
          this.loadMenuItems();
          alert('Item deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting item:', error);
          alert('Failed to delete item');
        }
      });
    }
  }

  saveItem(event: Event) {
    event.preventDefault();
    
    if (this.editingItem) {
      this.adminService.updateMenuItem(this.editingItem.id, this.formData).subscribe({
        next: () => {
          this.loadMenuItems();
          this.closeModal();
          alert('Item updated successfully');
        },
        error: (error) => {
          console.error('Error updating item:', error);
          alert('Failed to update item');
        }
      });
    } else {
      this.adminService.addMenuItem(this.formData).subscribe({
        next: () => {
          this.loadMenuItems();
          this.closeModal();
          alert('Item added successfully');
        },
        error: (error) => {
          console.error('Error adding item:', error);
          alert('Failed to add item');
        }
      });
    }
  }

  closeModal() {
    this.showModal = false;
    this.editingItem = null;
  }
}