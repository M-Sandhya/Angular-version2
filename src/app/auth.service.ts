import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Authservice {
  private loggedInUserKey = environment.LoggedInUserKey;
  private adminEmail = environment.AdminEmail;

  constructor(private http: HttpClient) {}

  login(user: any) {
    localStorage.setItem(this.loggedInUserKey, JSON.stringify(user)); 
  }

  logout() {
    localStorage.removeItem(this.loggedInUserKey); 
  }

  getLoggedInUser() {
    const user = localStorage.getItem(this.loggedInUserKey);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.loggedInUserKey);
  }

  getUserEmail() {
    const user = this.getLoggedInUser();
    return user ? user.email : null;
  }

  isUserAdmin() {
    const email = this.getUserEmail();
    return email === this.adminEmail;
  }

  isAuthenticated() {
    return this.isLoggedIn();
  }
  getUserDetails(userEmail: string): Observable<any[]> {
    const url = `${environment.UserDetails}?email=${userEmail}`;
    return this.http.get<any[]>(url);
  }
  
  getUserId(): number {
    const user = this.getLoggedInUser();
    return user ? user.id : null;
  }
  
}
