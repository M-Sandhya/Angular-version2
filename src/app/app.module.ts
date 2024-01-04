import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';




import { ContactComponent } from './contact/contact.component';
import{HttpClientModule} from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ExampleComponent } from './example/example.component';
import { CategoryComponent } from './category/category.component';
import { LogoutComponent } from './logout/logout.component';

import { ProductDescriptionComponent } from './product-description/product-description.component';

import { CartComponent } from './cart/cart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThankComponent } from './thank/thank.component';

import { AddressComponent } from './address/address.component';

import { MyAccountComponent } from './MyAccount/MyAccount.component';
import { OrdersComponent } from './Orders/Orders.component';
import { FooterComponent } from './footer/footer.component';













@NgModule({
  declarations: [														
    AppComponent,
  
   
    ContactComponent,HeaderComponent,
      HomeComponent,
      ProductComponent,
      LoginComponent,
      SignupComponent,
      ExampleComponent,
      CategoryComponent,
      LogoutComponent,
      ProductDescriptionComponent,
     CartComponent,
     DashboardComponent,
     CheckoutComponent,
     ThankComponent,
     
     AddressComponent,
    
      MyAccountComponent,
      OrdersComponent,
      
      FooterComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule
    
    
    
  
     
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
