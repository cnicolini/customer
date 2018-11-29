import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { MessageService } from '../message.service';
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
    private customerService: CustomerService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getCustomer()
  }

  getCustomer(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id === 'add') {
      this.customer = new Customer();
    }
    else {
      this.customerService.getCustomer(id)
        .subscribe(customer => this.customer = customer);
    }
  }

  save(): void {
    if (this.customer._id) {
      this.customerService.updateCustomer(this.customer)
        .subscribe(() => this.goBack());
    }
    else {
      this.customerService.addCustomer(this.customer).
        subscribe( customer =>
          this.subscribeAddCustomer(customer)
        );
    }
  }

  subscribeAddCustomer(customer: Customer) {
    this.customer = customer;
    this.goBack()
  }

  goBack(): void {
    this.location.back();
  }

  private log(message: string) {
    this.messageService.addMessage(`customer-detail.component: ${message}`);
  }

}
