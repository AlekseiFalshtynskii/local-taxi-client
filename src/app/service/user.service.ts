import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../model/user';
import * as api from '../api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<User> {
    return this.http.get<User>(api.USER_PATH);
  }

  saveUsername(username: string): Observable<void> {
    const body = {username};
    return this.http.post<void>(api.USER_USERNAME_PATH, body);
  }

  savePassword(oldPassword: string, newPassword: string): Observable<void> {
    const body = {oldPassword, newPassword};
    return this.http.post<void>(api.USER_PASSWORD_PATH, body);
  }

  saveEmail(email: string): Observable<void> {
    const body = {email};
    return this.http.post<void>(api.USER_EMAIL_PATH, body);
  }

  saveFIO(firstName: string, lastName: string, middleName: string): Observable<void> {
    const body = {firstName, lastName, middleName};
    return this.http.post<void>(api.USER_FIO_PATH, body);
  }

  deleteUser(): Observable<void> {
    return this.http.delete<void>(api.USER_PATH);
  }
}
