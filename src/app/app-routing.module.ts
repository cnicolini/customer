import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/customer', pathMatch: 'full' },
  { path: 'customer', component: CustomerComponent },
  { path: 'customer/add', component: CustomerDetailComponent },
  { path: 'customer/:id', component: CustomerDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
