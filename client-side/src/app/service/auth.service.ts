import { Injectable } from '@angular/core';
import { ValidateService } from './validate.service' 
import {JwtHelperService} from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


const AUTH_API = 'http://localhost:8701/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private isDev = true;  // Change to false before deployment
  private authToken: any ='';
  private user: any;
  private authStatus = new BehaviorSubject<boolean>(false);
  authStatusChanged = this.authStatus.asObservable();
  public tokenNotExpired(): boolean {
    const token = localStorage.getItem('id_token');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }


  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService) {
      // this.isDev = true;
    }

  registerUser(user: any){
    let headers = new Headers()
    headers.append('Content-type', 'application/type')
    return this.http.post(AUTH_API +'register', {
      name: user.name,
      email: user.email,
      password: user.password,
      username: user.username
    })
    .pipe(map((res:any)=>res))
  } 


  loginUser(user: any){
let headers = new Headers()
    headers.append('Content-type', 'application/type')
    return this.http.post(AUTH_API +'login', {
      name: user.name,
      email: user.email,
      password: user.password,
      username: user.username
    })
    .pipe(map((res:any)=>res))
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token;
    this.user = user
    this.authStatus.next(true);
  }

    loadToken(): void {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout(): void{
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.authStatus.next(false);
  }

  isLoggedIn(): boolean {
    return this.tokenNotExpired();
  }

}
