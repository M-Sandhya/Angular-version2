import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../Order.service';
import { Order } from '../models/Order';
import { Authservice } from '../auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  authService: Authservice;
  totalAmount: number | null | undefined;
  userId: any;

  constructor(private orderService: OrderService, private authservice: Authservice, private http: HttpClient) {
    this.authService = authservice; 
  }

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    const userEmail = this.authService.getUserEmail();
    if (userEmail) {
      this.authService.getUserDetails(userEmail).subscribe(
        (response: any[]) => {
          this.orders = response[0]?.ordered || [];
          this.totalAmount = typeof response[0]?.totalAmount === 'number' ? response[0].totalAmount : null;
          this.userId = response[0]?.userId; 
          console.log('Orders fetched successfully:', this.orders);
        },
        (error: any) => {
          console.error('Error fetching orders:', error);
        }
      );
    } else {
      console.error('User email not available');
    }
  }

  cancelOrder(order: Order) {
    const index = this.orders.indexOf(order);
    if (index !== -1) {
      this.orders.splice(index, 1); // Remove the order from the orders array
      this.updateTotalAmount(); // Update the total amount after canceling the order
      alert('Order canceled successfully.');
    } else {
      alert('Error canceling order.');
    }
  }
  

  updateTotalAmount() {
    // Calculate the updated total amount based on the remaining orders
    this.totalAmount = this.orders.reduce((total, order) => total + Number(order.fullPrice), 0);
  }

  getCurrentDateTime(): string {
    const currentDate = new Date();
    return currentDate.toISOString(); // Adjust the formatting as per your requirements
  }
}
