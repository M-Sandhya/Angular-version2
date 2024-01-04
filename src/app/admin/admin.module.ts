import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdashboardComponent } from './Adashboard/Adashboard.component';

import { UpdatemComponent } from './updatem/updatem.component';
import { UsermComponent } from './userm/userm.component';
import { ProductFormComponent } from './ProductForm/ProductForm.component';

const routes: Routes = [
  { path: 'admin/Adashboard', component: AdashboardComponent },
  { path: 'admin/updatem', component: UpdatemComponent },
  { path: 'admin/ProductForm', component: ProductFormComponent },
  { path: 'admin/userm', component: UsermComponent },
  
];

@NgModule({
  declarations: [
    AdashboardComponent,
   
    UpdatemComponent,
    UsermComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
