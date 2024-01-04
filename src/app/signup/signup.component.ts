import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/Environments/environment';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm !: FormGroup;
  showPassword: boolean = false;
  constructor( private formbuilder : FormBuilder, private http:HttpClient, private router:Router ) { }

  ngOnInit() {
    this.signupForm = this.formbuilder.group({
      fullname:['',[Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password:['',[Validators.required,Validators.minLength(6),Validators.pattern('^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{6,}$')]],
      mobile: ['', [Validators.required, Validators.pattern(/^[6789]\d{9}$/)]]
      
    })
}
signup() {
  const email = this.signupForm.value.email;
  const userDetailsUrl = `${environment.UserDetails}?email=${email}`;
  
  this.http.get<any[]>(userDetailsUrl).subscribe(
    (data) => {
      if (data.length > 0) {
        alert('Email already exists');
      } else {
        
        this.http.post<any>(environment.UserDetails, this.signupForm.value).subscribe(
          () => {
            alert('Sign up successful');
            this.signupForm.reset();
            this.router.navigate(['login']);
          },
          () => {
            alert('Something went wrong');
          }
        );
      }
    },
    () => {
      alert('Something went wrong');
    }
  );
  
}
togglePassword() {
  this.showPassword = !this.showPassword;
}
}
  
  


