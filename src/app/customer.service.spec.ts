import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CustomerService } from './customer.service';
import { Customer } from './customer';

describe('CustomerService', () => {

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should get customers', () => {
      const customersStub = getCustomersStub();
      const service: CustomerService = TestBed.get(CustomerService);

      service.getCustomers().subscribe(customers => {
        expect(customers.length).toBe(2);
        expect(customers).toEqual(customersStub);
      });

      const request = httpMock.expectOne(service.customerUrl);
      expect(request.request.method).toBe("GET");
      request.flush(customersStub);

      httpMock.verify();
  });

  it('should be created', () => {
    const service: CustomerService = TestBed.get(CustomerService);
    expect(service).toBeTruthy();
  });

  function getCustomersStub(): Customer[] {
    return [
        { _id: '1', name: 'Name 1', address: '1 Infinite Loop, CA' },
        { _id: '2', name: 'Name 2', address: '1 Infinite Loop, CA' }
    ];
  };

});
