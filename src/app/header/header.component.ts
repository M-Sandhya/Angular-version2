import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  myimages: string;
  myimages1: string;
  myimages2: string;
  myimages3: string;
  myimages4: string;
  myimages5: string;
  myimages6: string;
  myimages7: string;
  myimages8: string;
  activeTab: string | undefined;

  constructor(private router: Router) {
    this.myimages = "/assets/image/11.jpg";
    this.myimages1 = "/assets/image/jt.jpg";
    this.myimages2 = "/assets/image/ratings.jpg";
    this.myimages3 = "/assets/image/robo.jpg";
    this.myimages4 = "/assets/image/customers.jpg";
    this.myimages5 = "/assets/image/b3.png";
    this.myimages6 = "/assets/image/b4.png";
    this.myimages7 = "/assets/image/b7.jpg";
    this.myimages8 = "/assets/image/b5.jpg";
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveTab();
      }
    });
  }

  isActive(tab: string): boolean {
    return this.activeTab === tab;
  }

  private setActiveTab(): void {
    const currentRoute = this.router.url.split('/')[1];
    this.activeTab = currentRoute || 'home'; 
  }
}
