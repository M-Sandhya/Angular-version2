import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';

import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ExampleComponent } from './example/example.component';
import { CategoryComponent } from './category/category.component';
import { LogoutComponent } from './logout/logout.component';


import { ProductDescriptionComponent } from './product-description/product-description.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThankComponent } from './thank/thank.component';
import { AdminModule } from './admin/admin.module';
import { MyAccountComponent } from './MyAccount/MyAccount.component';






const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:"category",
    component:CategoryComponent,
     
  },
  {
    path:"product",
    component:ProductComponent,
    
    
    
  },
  {
    path:"example",
    component:ExampleComponent
  },
  {
    path:"contact",
    component:ContactComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"logout",
    component:LogoutComponent
  },
  {
    path:"thank",
    component:ThankComponent
  },
  
  { path: '', redirectTo: '/products', pathMatch:'full'},
  {
    path:'products/:id',
    component:ProductDescriptionComponent,
    canActivate: [AuthGuard]
},
{
  path:"cart",
  component:CartComponent
},
{
  path:"account",
  component:MyAccountComponent
},
{
  path:'checkout',
  component:CheckoutComponent
},
{ path: 'cart', component: CartComponent },
  { path: 'checkout/cart', component: CheckoutComponent },
  { path: 'product', component: ProductComponent },
  { path: 'checkout/product', component: CheckoutComponent },
{
  path:"board",
  component:DashboardComponent
},
{path:'**',
 redirectTo:'home',
pathMatch:'full'}
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes),AdminModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
