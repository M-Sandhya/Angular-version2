import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-MyAccount',
  templateUrl: './MyAccount.component.html',
  styleUrls: ['./MyAccount.component.css']
})
export class MyAccountComponent implements OnInit {

  activeTab: string = 'dashboard-tab';

  constructor() { }

  ngOnInit(): void {
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }}