import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IOrder } from '../models/iorder';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderServiceService {
  baseUri: string = 'http://localhost:3000/orders';
  //headers = new HttpHeaders().set('Content-Type', 'application/json');


  private httpOptions = {};


  constructor(private httpClient: HttpClient, private userService:UserAuthService) {  
    const token = localStorage.getItem('currentUser');   

this.httpOptions={
  headers:new HttpHeaders(
    {
      'Content-Type':'application/json',
     
    }
  )
};
console.log(token);

}

  getAllOrders(): Observable<IOrder[]> {
    // return this.httpClient.get<IOrder[]>(`${this.baseUri}`);
    console.log(this.httpOptions);
    
    return this.httpClient.get<IOrder[]>(
      `http://localhost:3000/orders`,
      this.httpOptions
    );
  }



getOrderByID(oid:number):Observable<IOrder>{
  return this.httpClient.get<IOrder>(`http://localhost:3000/orders/${oid}`,this.httpOptions);
  }

  getUserName(userId: string): Observable<string> {
    // Make an HTTP request to fetch the user name based on the user ID
    return this.httpClient.get<string>(`http://localhost:3000/users/${userId}`, this.httpOptions);
  }

  addNewOrder(order: IOrder): Observable<IOrder> {
    return this.httpClient.post<IOrder>(
      `http://localhost:3000/orders`,
      JSON.stringify(order),
      this.httpOptions
    );
  }

  deleteOrder(oid: number): Observable<IOrder> {
    return this.httpClient.delete<IOrder>(
      `http://localhost:3000/orders/${oid}`,
      this.httpOptions
    );
  }

  getUpdateOrder(oid: string): Observable<IOrder> {
    return this.httpClient.get<IOrder>(
      `http://localhost:3000/orders/${oid}`,
      this.httpOptions
    );
  }


// ...

updateOrder(order: IOrder): Observable<IOrder> {
  return this.httpClient.patch<IOrder>(
    `http://localhost:3000/orders/${order.id}`,
    { status: order.status }, // Update only the status property
    this.httpOptions
  ).pipe(
    map(() => order),
    catchError(this.errorMgmt)
  );
}


  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
