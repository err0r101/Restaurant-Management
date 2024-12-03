// src/app/services/admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/api/menu';

  constructor(private http: HttpClient) {}

  // Authentication
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  // Menu Management
  getAllMenuItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/menu`);
  }

  addMenuItem(menuItem: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/menu`, menuItem);
  }

  updateMenuItem(id: number, menuItem: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/menu/${id}`, menuItem);
  }

  deleteMenuItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/menu/${id}`);
  }
}