import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '../cart/cart.component';
import { HttpClient } from '@angular/common/http';
import { Authservice } from '../auth.service';
import { FormGroup } from '@angular/forms';

export interface Product {
  imageUrl: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  productImageUrl: string = '';
  productName: string = '';
  productPrice: number = 0;
  quantity: number = 1;
  totalPrice: number = 0;
  cartItems: CartItem[] = [];
  total: number = 0;
  selectedPaymentMethod: string = 'creditcard';
  amount: string = '';
  expirationDate: string = '';
  cardNumber: string = '';
  pincode: string = '';
  address: string = '';
  email: string = '';
  userName: string = '';
  product: Product | undefined;

  

  

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authservice: Authservice,
    private router: Router
  ) {}

  ngOnInit() {
    const state = history.state;
    if (state && state.cartItems) {
      this.cartItems = state.cartItems;
      this.calculateTotal();
    }
  
    this.route.queryParams.subscribe(params => {
      this.productImageUrl = params['img'];
      this.productName = params['name'];
      this.productPrice = +params['price'];
      this.totalPrice = this.productPrice;
  
    
      this.product = {
        imageUrl: this.productImageUrl,
        name: this.productName,
        price: this.productPrice
      };
    });
  
  
    
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.totalPrice = this.productPrice * this.quantity;
    }
  }

  increaseQuantity() {
    this.quantity++;
    this.totalPrice = this.productPrice * this.quantity;
  }

  cancelCheckout() {
   
    this.productImageUrl = '';
    this.productName = '';
    this.productPrice = 0;
    
    this.quantity = 1;
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => {
      const itemTotal = item.price * item.quantity;
      const itemTotalWithTax = itemTotal + itemTotal * 0.05; // Apply 5% tax
      return acc + itemTotalWithTax;
    }, 0);
  }

  
  
  
  placeOrder() {
    const loggedInUser = this.authservice.getLoggedInUser();
  
    if (loggedInUser) {
     
      loggedInUser.address = this.address;
      loggedInUser.pincode = this.pincode;
      const userEmail = loggedInUser.email;
      
      
      loggedInUser.ordered = this.cartItems.map(item => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        fullPrice: item.price * item.quantity,
        userId: loggedInUser.id
      }));
  
      loggedInUser.totalAmount = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
      this.http
        .put(`http://localhost:3000/signup/${loggedInUser.id}`, loggedInUser)
        .subscribe(
          response => {
            console.log('Order placed successfully:', response);
            alert('Order placed successfully');
            this.router.navigate(['/thank']); 
          
      
     
      
  
           
            this.http
              .get<CartItem[]>(`http://localhost:3000/cartItems?userEmail=${userEmail}`)
              .subscribe(
                cartItems => {
                 
                  for (const cartItem of cartItems) {
                    this.http
                      .delete(`http://localhost:3000/cartItems/${cartItem.id}`)
                      .subscribe(
                        deleteResponse => {
                          console.log('Cart item deleted successfully:', deleteResponse);
                        },
                        deleteError => {
                          console.error('Failed to delete cart item:', deleteError);
                        }
                      );
                  }
                },
                retrieveError => {
                  console.error('Failed to retrieve cart items:', retrieveError);
                  alert('Failed to retrieve cart items');
                }
              );
          },
          error => {
            console.error('Failed to place order:', error);
            alert('Failed to place order');
          }
        );
    } else {
      console.error('User not logged in');
      alert('User not logged in');
    }
  }
  isFormValid(): boolean {
    return (
      !!this.userName &&
     !!this.email &&
    !!this.address &&
    !!this.pincode &&
     !!this.cardNumber &&
     !!this.expirationDate &&
    !!this.amount
   );
 }
  
  
  
  
}

