import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authservice } from '../auth.service';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent implements OnInit {

  

    constructor(private router: Router, private authService: Authservice) { }
  
    ngOnInit() {
      this.logout();
    }
  
    logout() {
      const userEmail = this.authService.getUserEmail(); 
  
      this.authService.logout(); 
  
      
      localStorage.removeItem(userEmail);
  
      alert('Logged out successfully');
  // Redirect to the login page
      this.router.navigate(['home']);
    }
  }