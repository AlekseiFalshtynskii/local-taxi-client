import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  private authority: string;

  constructor(private token: TokenStorageService) {
  }

  ngOnInit() {
    if (this.token.getToken()) {
      this.roles = this.token.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_DRIVER') {
          this.authority = 'driver';
        } else if (role === 'ROLE_PASSENGER') {
          this.authority = 'passenger';
        } else {
          return false;
        }
        return true;
      });
    }
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }
}
