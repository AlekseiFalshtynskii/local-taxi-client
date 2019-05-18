import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenResponse } from '../model/token-response';
import { SignUpInfo } from '../model/signup-info';
import * as api from '../api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signIn(username: string, password: string): Observable<TokenResponse> {
    const headers = new HttpHeaders(
      {
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization: api.AUTHORIZATION
      }
    );
    return this.http.post<TokenResponse>(
      `${api.TOKEN_PATH}?username=${username}&password=${password}&grant_type=password`, null, {headers}
    );
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(api.SIGNUP_PATH, info);
  }
}
