import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthLoginInfo } from '../model/login-info';
import { JwtResponse } from '../model/jwt-response';
import { SignUpInfo } from '../model/signup-info';
import { BASE_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signInPath = 'auth/signin';

  private signUpPath = 'auth/signup';

  constructor(private http: HttpClient) {
  }

  signIn(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(BASE_URL + this.signInPath, credentials);
  }

  signUp(info: SignUpInfo): Observable<string> {
    console.log(info);
    return this.http.post<string>(BASE_URL + this.signUpPath, info);
  }
}
