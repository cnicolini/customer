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

  private customerUrl = "http://localhost:3000/customer";

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getCustomers(): Observable<Customer[]> {
    // this.messageService.addMessage("Customers retrieved");
    // return of(CUSTOMERS);
    return this.http.get<Customer[]>(this.customerUrl, {responseType: 'json'})
      .pipe(
        catchError(this.handleError('getCustomers', []))
      );
  }

  getCustomer(id: string): Observable<Customer> {
    const url = `${this.customerUrl}/${id}`;
    return this.http.get<Customer>(url, {responseType: 'json'})
      .pipe(
        catchError(this.handleError<Customer>(`getCustomer id=${id}`))
      );
  }

  updateCustomer(customer: Customer): Observable<any> {
    if (!customer) {
      this.log("updateCustomer: customer is required");
      return;
    }
    const url = `${this.customerUrl}/${customer._id}`;
    return this.http.put(url, customer, httpOptions).
      pipe(
        catchError(this.handleError<any>('updateCustomer'))
      )
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.addMessage(`CustomerService: ${message}`);
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
