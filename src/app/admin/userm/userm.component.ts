import { Component, OnInit } from '@angular/core';
import { UserService } from '../User.service';

@Component({
  selector: 'app-userm',
  templateUrl: './userm.component.html',
  styleUrls: ['./userm.component.css']
})
export class UsermComponent implements OnInit {

  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  getUserOrderedItems(userId: string): any[] {
    const user = this.users.find(user => user.id === userId);
    return user ? user.orderedItems : [];
  }
}