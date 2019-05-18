import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StorageService } from '../service/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.storageService.getToken();
    if (token != null) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.storageService.getToken()}`
        }
      });
    }
    return next.handle(req);
  }
}

export const HttpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
