import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

export interface Product {
  id: string;
  title: string; 
  price: number;
  description: string;
  imageUrl: string;
  category: string;
 
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.ProductDetails
 
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  getProductById(productId: string): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<Product>(url);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(productData: Product): Observable<Product> {
    const url = `${this.apiUrl}/${productData.id}`;
    return this.http.put<Product>(url, productData);
  }
  
  

  deleteProduct(productId: string): Observable<void> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete<void>(url);
  }
}
