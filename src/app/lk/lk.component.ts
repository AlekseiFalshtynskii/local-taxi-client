import { Component, OnInit } from '@angular/core';

import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.css']
})
export class LKComponent implements OnInit {
  info: any;

  constructor(private storageService: StorageService) {
  }

  ngOnInit() {
    this.info = {
      token: this.storageService.getToken(),
      user: this.storageService.getUser()
    };
  }

  logout() {
    this.storageService.signOut();
    window.location.reload();
  }
}
