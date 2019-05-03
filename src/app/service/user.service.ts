import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from '../model/jwt-response';
import { User } from '../model/user';
import { BASE_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersIdPath = 'users/$userId';

  private usernamePath = 'users/$userId/username';

  private passwordPath = 'users/$userId/password';

  private emailPath = 'users/$userId/email';

  private fioPath = 'users/$userId/fio';

  constructor(private http: HttpClient) {
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(BASE_URL + this.usersIdPath.replace('$userId', String(userId)));
  }

  saveUsername(userId: number, username: string): Observable<JwtResponse> {
    const body = {username};
    return this.http.post<JwtResponse>(BASE_URL + this.usernamePath.replace('$userId', String(userId)), body);
  }

  savePassword(userId: number, oldPassword: string, newPassword: string): Observable<void> {
    const body = {oldPassword, newPassword};
    return this.http.post<void>(BASE_URL + this.passwordPath.replace('$userId', String(userId)), body);
  }

  saveEmail(userId: number, email: string): Observable<User> {
    const body = {email};
    return this.http.post<User>(BASE_URL + this.emailPath.replace('$userId', String(userId)), body);
  }

  saveFIO(userId: number, firstName: string, lastName: string, middleName: string): Observable<User> {
    const body = {firstName, lastName, middleName};
    return this.http.post<User>(BASE_URL + this.fioPath.replace('$userId', String(userId)), body);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(BASE_URL + this.usersIdPath.replace('$userId', String(userId)));
  }
}
