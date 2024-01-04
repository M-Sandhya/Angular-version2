import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Authservice } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface User {
  id: number;
  fullname: string;
  email: string;
  mobile: string;
  address: string;
  pincode: string;
}

@Component({
  selector: 'app-Address',
  templateUrl: './Address.component.html',
  styleUrls: ['./Address.component.css']
})
export class AddressComponent implements OnInit {
  loggedInUser: User | null = null;
  addressForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private authService: Authservice,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      address: ['', Validators.required],
      pincode: ['', Validators.required]
    });

    this.fetchLoggedInUser();
  }

  fetchLoggedInUser() {
    const userEmail = this.authService.getUserEmail();
    if (userEmail) {
      this.authService.getUserDetails(userEmail).subscribe(
        (users: User[]) => {
          this.loggedInUser = users.length > 0 ? users[0] : null;
          if (this.loggedInUser) {
            this.addressForm.patchValue({
              address: this.loggedInUser.address,
              pincode: this.loggedInUser.pincode
            });
          }
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    } else {
      console.error('User email not found.');
    }
  }

  toggleEditMode() {
    this.isEditMode = true;
  }

  saveChanges() {
    if (this.addressForm.valid) {
      const updatedUser: User = {
        ...this.loggedInUser!,
        address: this.addressForm.value.address,
        pincode: this.addressForm.value.pincode
      };

      this.http.put(`http://localhost:3000/signup/${updatedUser.id}`, updatedUser).subscribe(
        (response: any) => {
          console.log('User details updated successfully:', response);
          alert("Address updated successfully")
          this.loggedInUser = updatedUser;
          this.isEditMode = false;
        },
        (error: any) => {
          console.error('Failed to update user details:', error);
        }
      );
    }
  }
}
