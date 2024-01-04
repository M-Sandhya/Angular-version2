import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Authservice } from '../auth.service';
import { NavigationExtras, Router } from '@angular/router';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  fullPrice: string;
  thumbnail: string;
  description: string;
  userEmail: string;
  productId: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;

  constructor(
    private http: HttpClient,
    private authService: Authservice,
    private router: Router
  ) {}

  ngOnInit() {
    this.retrieveCartItems();
  }

  retrieveCartItems() {
    const userEmail = this.authService.getUserEmail();
    if (userEmail) {
      this.http
        .get<CartItem[]>(`http://localhost:3000/cartItems?userEmail=${userEmail}`)
        .subscribe(
          (response) => {
            this.cartItems = response;
            this.fetchItemDetails();
            this.changeTotal();
          },
          (error) => {
            console.error('Error retrieving cart items:', error);
          }
        );
    }
  }

  fetchItemDetails() {
    this.cartItems.forEach((item) => {
      this.http
        .get<any>(`http://localhost:3000/products/${item.productId}`)
        .subscribe(
          (response) => {
            item.description = response.description;
            item.thumbnail = response.thumbnail;
          },
          (error) => {
            console.error('Error retrieving item details:', error);
          }
        );
    });
  }

  changeVal(item: CartItem) {
    const eq = Math.round(item.price * item.quantity * 100) / 100;
    item.fullPrice = 'Rs.' + eq.toFixed(2);
    this.changeTotal();
  }

  changeTotal() {
    let price = 0;
    this.cartItems.forEach((item) => {
      if (typeof item.price === 'number' && !isNaN(item.price)) {
        price += parseFloat(item.price.toFixed(2)) * item.quantity;
      }
    });

    price = Math.round(price * 100) / 100;
    const tax = Math.round(price * 0.05 * 100) / 100;
    const shipping = 0; // Set the shipping value
    const fullPrice = Math.round((price + tax + shipping) * 100) / 100;

    this.subtotal = price;
    this.tax = tax;
    this.total = fullPrice;
  }

  removeItem(index: number, productId: number) {
    
    this.cartItems.splice(index, 1);

    
    this.http
      .delete(`http://localhost:3000/cartItems/${productId}`)
      .subscribe(
        () => {
          console.log('Product removed successfully from db.json.');
        },
        (error) => {
          console.error('Error removing product from db.json:', error);
        }
      );
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
    this.changeVal(item);
    this.updateCartItem(item);
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 0) {
      item.quantity--;
      this.changeVal(item);
      this.updateCartItem(item);
    }
  }

  updateCartItem(item: CartItem) {
    const updateUrl = `http://localhost:3000/cartItems/${item.id}`;
    this.http.put<CartItem>(updateUrl, item).subscribe(
      (response) => {
        console.log('Item quantity updated successfully in db.json:', response);
      },
      (error) => {
        console.error('Error updating item quantity in db.json:', error);
      }
    );
  }

  checkout() {
    const navigationExtras = {
      state: {
        cartItems: this.cartItems
      }
    };
    this.router.navigate(['/checkout'], navigationExtras);
  }}