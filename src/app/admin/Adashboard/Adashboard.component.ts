import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authservice } from 'src/app/auth.service';

@Component({
  selector: 'app-Adashboard',
  templateUrl: './Adashboard.component.html',
  styleUrls: ['./Adashboard.component.css']
})
export class AdashboardComponent  {
  activeTab: string = 'user-details';

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  constructor(public authService: Authservice, private router: Router) {}

  logout() {
    this.authService.logout();
    alert('Admin Logout Successful');
    this.router.navigate(['/header']); // Replace '/' with the route for your home page
  }
  

  

  ngOnInit(): void {
  }

  

  



}