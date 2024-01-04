import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './models/Order';
import { Authservice } from './auth.service';
import { environment } from 'src/Environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class OrderService {
    private apiUrl = environment.UserDetails; 
  
    constructor(private http: HttpClient) {}
  
    getOrdersByUserEmail(userEmail: string): Observable<Order[]> {
      const url = `${this.apiUrl}?userEmail=${userEmail}`;
      return this.http.get<Order[]>(url);
    }
  
    cancelOrder(orderId: number): Observable<void> {
      const url = `${this.apiUrl}/${orderId}`;
      return this.http.delete<void>(url);
    }
  }
  