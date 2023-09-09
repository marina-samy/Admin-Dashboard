import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IProduct } from '../models/iproduct';
import { catchError, map, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  private httpOptions={};

  constructor(private httpClient: HttpClient) {
this.httpOptions={
  headers:new HttpHeaders(
    {
      'Content-Type':'application/json'
    }
  )
};

}

getAllProducts():Observable<IProduct[]>{
  return this.httpClient.get<IProduct[]>(`http://localhost:3000/Products`)
}


  addNewProduct(category:IProduct):Observable<IProduct>{
    return this.httpClient.post<IProduct>(`http://localhost:3000/Products`,JSON.stringify(category),
    this.httpOptions)
  }

  deleteProduct(cid:string):Observable<IProduct>{
    return this.httpClient.delete<IProduct>(`http://localhost:3000/Products/${cid}`,this.httpOptions)
  }


  getUpdateProduct(cid:string):Observable<IProduct>{
    return this.httpClient.get<IProduct>(`http://localhost:3000/Products/${cid}`,this.httpOptions)
  }

  updateProduct(category:IProduct):Observable<IProduct>{
    return this.httpClient.patch<IProduct>(`http://localhost:3000/Products/${category.id}`,
     category,this.httpOptions).pipe( map(()=>category )
    )
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
