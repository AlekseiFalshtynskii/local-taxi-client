import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthLoginInfo } from '../model/login-info';
import { JwtResponse } from '../model/jwt-response';
import { SignUpInfo } from '../model/signup-info';
import * as config from '../config';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signInPath = 'auth/signin';

  private signUpPath = 'auth/signup';

  constructor(private http: HttpClient) {
  }

  signIn(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(config.BASE_URL + this.signInPath, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    console.log(info);
    return this.http.post<string>(config.BASE_URL + this.signUpPath, info, httpOptions);
  }
}
