import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Customer } from './customer';

import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerUrl = 'http://localhost:3000/customer';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerUrl, {responseType: 'json'}).pipe(
        catchError(this.handleError('getCustomers', []))
    );
  }

  getCustomer(id: string): Observable<Customer> {
    const url = `${this.customerUrl}/${id}`;
    return this.http.get<Customer>(url, {responseType: 'json'}).pipe(
        catchError(this.handleError<Customer>(`getCustomer id=${id}`))
    );
  }

  addCustomer(customer: Customer): Observable<Customer> {
      if (!customer) {
        this.log('addCustomer: customer is required');
        return;
      }
      return this.http.post(this.customerUrl, customer, httpOptions).pipe(
        tap(c => {
          const cust = c as Customer;
          this.log(`Customer created ${cust._id}`);
        }),
        catchError(this.handleError<any>('addCustomer'))
      );
  }

  updateCustomer(customer: Customer): Observable<any> {
    if (!customer) {
      this.log('updateCustomer: customer is required');
      return;
    }
    const url = `${this.customerUrl}/${customer._id}`;
    return this.http.put(url, customer, httpOptions).pipe(
      tap ( _ => this.log(`Customer updated`) ),
      catchError(this.handleError<any>('updateCustomer'))
    );
  }

  deleteCustomer(id: string): Observable<Customer> {
    if (!id) {
      this.log('deleteCustomer: id is required');
      return;
    }
    const url = `${this.customerUrl}/${id}`;
    return this.http.delete(url, httpOptions).pipe(
        catchError(this.handleError<any>('deleteCustomer'))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.setMessage(`CustomerService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
