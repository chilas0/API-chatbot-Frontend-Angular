import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  //It send a form with user data to backend Node.js
  register(formRegister: any):Observable<any>{
    return this.http.post<any>("http://localhost:9377/api/v1/auth/register", formRegister);
  }

  //It send a form with login credential to backend Node.js, it return a token
  login(formLogin: any):Observable<any>{
    return this.http.post<any>("http://localhost:9377/api/v1/auth/login", formLogin);
  }
}
