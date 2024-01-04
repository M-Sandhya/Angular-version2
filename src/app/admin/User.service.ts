import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.BaseUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/signup`);
  }

  getUser(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/signup/${userId}`);
  }

  getUserOrders(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ordered?userId=${userId}`);
  }

  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cartItems`);
  }

  getUserCartItems(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cartItems?userId=${userId}`);
  }
}
