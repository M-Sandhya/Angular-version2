import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product/product.service';
import { HttpClient } from '@angular/common/http';
import { Authservice } from '../auth.service';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {
  productId!: number;
  product: any;
  activeImageIndex: number = 0;
  userEmail: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private http: HttpClient,
    private authService: Authservice,
    private router: Router 
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = +params['id'];
      this.getProductDetails();
    });

    
    this.userEmail = this.authService.getUserEmail();
  }

  getProductDetails() {
    this.productService.getProduct(this.productId).subscribe((data) => {
      this.product = data;
    });
  }

  setActiveImage(index: number) {
    this.activeImageIndex = index;
  }

  addToCart() {
   
    const cartItems = localStorage.getItem('cartItems');
    const newCartItem = {
      userEmail: this.userEmail,
      productId: this.product.id,
      title: this.product.title,
      price: this.product.price,
      quantity: 1
    };
    if (cartItems) {
      const existingCartItems = JSON.parse(cartItems);
      const productIndex = existingCartItems.findIndex(
        (item: any) => item.productId === newCartItem.productId
      );
      if (productIndex !== -1) {
        existingCartItems[productIndex].quantity++;
      } else {
        existingCartItems.push(newCartItem);
      }
      localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
    } else {
      const newCartItems = [newCartItem];
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    }

    console.log('Product added to cart:', newCartItem);

    
    this.http
      .get<any>(
        'http://localhost:3000/cartItems?userEmail=' +
          this.userEmail +
          '&productId=' +
          newCartItem.productId
      )
      .subscribe(
        (response: any) => {
          if (Array.isArray(response) && response.length > 0) {
            const existingCartItem = response[0];
            existingCartItem.quantity++;
            this.http
              .put(
                'http://localhost:3000/cartItems/' + existingCartItem.id,
                existingCartItem
              )
              .subscribe(
                () => {
                  console.log(
                    'Product quantity updated in db.json:',
                    existingCartItem
                  );
                },
                (error) => {
                  console.error(
                    'Failed to update product quantity in db.json:',
                    error
                  );
                }
              );
          } else {
            
            this.http
              .post('http://localhost:3000/cartItems', newCartItem)
              .subscribe(
                (response: any) => {
                  console.log('Product added to db.json:', response);
                },
                (error) => {
                  console.error(
                    'Failed to add product to db.json:',
                    error
                  );
                }
              );
          }

         
          alert('Product added to cart!');
        },
        (error) => {
          console.error('Failed to fetch product from db.json:', error);
        }
      );
  }

  handleBuyNowClick() {
    const queryParams = {
      imageUrl: this.product.img,
      name: this.product.title,
      price: this.product.price
    };
  
    this.router.navigate(['/checkout'], { queryParams });
  }
}

