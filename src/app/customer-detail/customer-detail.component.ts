import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CustomerService } from '../customer.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.less']
})
export class CustomerDetailComponent implements OnInit {

  @Input() customer: Customer;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.getCustomer()
  }

  getCustomer(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.customerService.getCustomer(id)
      .subscribe(customer => this.customer = customer);
  }

  save(): void {
    this.customerService.updateCustomer(this.customer)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
