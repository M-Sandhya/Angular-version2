import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './models/account';
import { Authservice } from './auth.service';


export interface User extends Account {
  id: number;
  fullname: string;
  mobile: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}




@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:3000/signup';

  constructor(private http: HttpClient,private authService: Authservice) {}
  
  getAccount(): Observable<Account> {
    const userId = this.authService.getUserId();
    return this.http.get<Account>(`${this.apiUrl}/${userId}`);
  }

  updateAccount(account: Account): Observable<void> {
    const userId = this.authService.getUserId(); 
    return this.http.put<void>(`${this.apiUrl}/${userId}`, account);
  }
  getUserById(userId: number): Observable<User> {
    const url = `api/users/${userId}`; 
    return this.http.get<User>(url);
  }
  
}