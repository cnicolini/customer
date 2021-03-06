import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../customer';

import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.less']
})
export class CustomerComponent implements OnInit {

  customers: Customer[];

  selectedCustomer: Customer;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe(customers => this.customers = customers);
  }

  delete(customer: Customer): void {
    this.customerService.deleteCustomer(customer._id).subscribe();
    this.customers = this.customers.filter(c => c !== customer);
  }

  add(): void {
    this.router.navigate(['/customer', 'add']);
  }

}
