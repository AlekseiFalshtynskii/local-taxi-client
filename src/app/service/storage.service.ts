import { Injectable } from '@angular/core';

import { User } from '../model/user';

const TOKEN_KEY = 'AuthToken';
const USER_KEY = 'AuthUser';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  signOut() {
    window.localStorage.clear();
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: User) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): User {
    return Object.assign(new User(), JSON.parse(localStorage.getItem(USER_KEY)));
  }

  public isDriver(): boolean {
    return !!this.getUser().roles.find(role => {
      return role.name === 'driver';
    });
  }

  public isPassenger(): boolean {
    return !!this.getUser().roles.find(role => {
      return role.name === 'passenger';
    });
  }
}
