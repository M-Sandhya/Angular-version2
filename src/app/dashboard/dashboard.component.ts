import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Authservice } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedInUser: any;
  image1: string;
  isEditMode: boolean = false;
  editedUser: any;

  constructor(
    private authService: Authservice,
    private http: HttpClient,
    private router: Router
  ) {
    this.image1 = '/assets/images/logo.jpg';
  }

  ngOnInit() {
    this.fetchLoggedInUser();
  }

  fetchLoggedInUser() {
    const userEmail = this.authService.getUserEmail();
    if (userEmail) {
      this.authService.getUserDetails(userEmail).subscribe(
        (user) => {
          this.loggedInUser = user.length > 0 ? user[0] : null;
          this.editedUser = { ...this.loggedInUser };
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    } else {
      console.error('User email not found.');
    }
  }

  enableEditMode() {
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.editedUser = { ...this.loggedInUser };
  }

  saveChanges() {
    const userId = this.loggedInUser.id; 
    const apiUrl = `http://localhost:3000/signup/${userId}`;
  
    this.http.put(apiUrl, this.editedUser).subscribe(
      (response: any) => {
        console.log('User details updated successfully:', response);
        alert('User Details Updated successfully');
        this.loggedInUser = { ...this.editedUser };
        this.isEditMode = false;
      },
      (error: any) => {
        console.error('Failed to update user details:', error);
    
        if (error.status === 404) {
          alert('User not found. Please try again.');
        } else {
          alert('Failed to update user details. Please try again later.');
        }
      }
    );
  }
  
  
  
  
  

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
