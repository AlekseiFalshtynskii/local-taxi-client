import { Injectable } from '@angular/core';

import { User } from '../model/user';
import { TokenResponse } from '../model/token-response';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private user: User;

  constructor() {
  }

  signOut() {
    window.localStorage.clear();
    this.user = undefined;
  }

  public saveToken(token: TokenResponse) {
    window.localStorage.clear();
    window.localStorage.setItem(ACCESS_TOKEN, token.access_token);
    window.localStorage.setItem(REFRESH_TOKEN, token.refresh_token);
  }

  public getToken(): string {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  public saveUser(user: User) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.user = user;
  }

  public getUser(): User {
    if (!this.user) {
      this.user = Object.assign(new User(), JSON.parse(localStorage.getItem(USER_KEY)));
    }
    return this.user;
  }

  public isDriver(): boolean {
    const user = this.getUser();
    return user.id && !!user.authorities.find(authority => {
      return authority.authority === 'AUTHORITY_DRIVER';
    });
  }

  public isPassenger(): boolean {
    const user = this.getUser();
    return user.id && !!user.authorities.find(authority => {
      return authority.authority === 'AUTHORITY_PASSENGER';
    });
  }
}
