import { Injectable } from '@angular/core';

import { User } from '../model/user';

const TOKEN_KEY = 'AuthToken';
const USER_KEY = 'AuthUser';

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
    return user.id && !!user.roles.find(role => {
      return role.name === 'ROLE_DRIVER';
    });
  }

  public isPassenger(): boolean {
    const user = this.getUser();
    return user.id && !!user.roles.find(role => {
      return role.name === 'ROLE_PASSENGER';
    });
  }
}
