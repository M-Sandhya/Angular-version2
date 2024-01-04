import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  img1:string;
  img2:string;
  img3:string;
  img4:string;
  myimages17:string;
  myimages18:string;
  myimages19:string;
  myimages20:string;
  
  constructor() {
    this.img1="/assets/image/pro1.jpeg";
    this.img2="/assets/image/violet.jpeg";
    this.img3="/assets/image/pro5.jpeg";
    this.img4="/assets/image/pro4.webp";
    this.myimages17="/assets/image/np3.jpg";
    this.myimages18="/assets/image/np4.webp";
    this.myimages19="/assets/image/np5.jpg";
    this.myimages20="/assets/image/np7.webp";
   }
     
  ngOnInit() {
  }

}
