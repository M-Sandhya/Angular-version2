import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Authservice } from '../auth.service';
import { environment } from 'src/Environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authservice: Authservice
  ) {}

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    const adminEmail = environment.AdminEmail;
    const adminPassword = environment.AdminPassword;

    if (
      this.loginForm.value.email === adminEmail &&
      this.loginForm.value.password === adminPassword
    ) {
      
      const adminUser = { email: adminEmail, role: 'admin' };
      this.authservice.login(adminUser); 
      alert('Admin Login Success');
      this.loginForm.reset();
      this.router.navigate(['/admin/Adashboard']);
    } else {
    
      this.http
        .get<any[]>(environment.UserDetails)
        .subscribe(res => {
          const user = res.find(a => {
            return (
              a.email === this.loginForm.value.email &&
              a.password === this.loginForm.value.password
            );
          });
          if (user) {
            this.authservice.login(user);
            alert('User Login Success');
            this.loginForm.reset();
            this.router.navigate(['category']);
          } else {
            alert('Invalid credentials');
          }
        });
    }
  }
  
  logout() {
    this.authservice.logout();
    
    this.router.navigate(['/login']);
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
