// src/app/services/menu.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl = 'http://localhost:8080/api/menu';

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<any[]> {
    console.log('Fetching menu items from:', this.baseUrl); // Debug log
    return this.http.get<any[]>(this.baseUrl);
  }

  addItem(item: any): Observable<any> {
    return this.http.post(this.baseUrl, item);
  }

  updateItem(id: number, item: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAllMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.baseUrl);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }

  getItemsByCategory(category: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.baseUrl}/category/${category}`);
  }
}