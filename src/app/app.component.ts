import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private authorized: boolean;

  constructor(private router: Router,
              public storageService: StorageService) {
  }

  ngOnInit() {
    this.authorized = !!this.storageService.getToken();
  }

  logout() {
    this.storageService.signOut();
    this.router.navigateByUrl('/auth/signin').then();
  }
}
