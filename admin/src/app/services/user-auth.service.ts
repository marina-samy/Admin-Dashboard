import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, throwError} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private isUserLoggedSubject:BehaviorSubject<boolean>;
  private tokenExpiration!: Date;
  private errorSubject = new Subject<HttpErrorResponse>();
  error$ = this.errorSubject.asObservable();

  // private apiUrl = 'http://localhost:3001/login'; 

  constructor(private http: HttpClient) {
    this.isUserLoggedSubject=new BehaviorSubject<boolean>(this.UserState)
  }



  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any>('http://localhost:3000/admin').pipe(
      map(response => {
        const foundUser = response.find((user: any) => user.email === email && user.password === password);
        const token = "stbm33322";
        if (foundUser) {
          localStorage.setItem('currentUser', token); // Save the token in local storage
          this.isUserLoggedSubject.next(true);
          return true;
        }
        return false;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

logout() {
  localStorage.removeItem('currentUser');
  this.isUserLoggedSubject.next(false);
}

isAdmin(): boolean {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
  if (currentUser && currentUser.token) {
    const tokenPayload = JSON.parse(atob(currentUser.token.split('.')[1]));
    
    return tokenPayload.isAdmin;
  }
  return false;
}



getUserStatus():Observable<boolean>{
  return this.isUserLoggedSubject.asObservable();
}




get UserState():boolean{

  return (localStorage.getItem('currentUser'))?true:false;
}

get IsLogin(){
  const token = localStorage.getItem('currentUser')
  return token;
}

setTokenExpiration(expiration: Date) {
  this.tokenExpiration = expiration;
}

getTokenExpiration(): Date {
  return this.tokenExpiration;
}

isTokenExpired(): boolean {
  const now = new Date();
  const expiration = this.getTokenExpiration();
  return now >= expiration;
}
}

