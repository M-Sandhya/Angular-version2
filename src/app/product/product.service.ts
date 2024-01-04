import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/Environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${environment.ProductDetails}`);
  }

  getProduct(productId: number) {
    return this.http.get(`${environment.ProductDetails}/${productId}`);
  }

  
}

