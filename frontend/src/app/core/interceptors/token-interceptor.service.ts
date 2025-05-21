import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from '../data/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  public token: string | null = "";
  excludedUrl: string = environment.api + constants.LOGIN_URL;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url === this.excludedUrl) return next.handle(req);

    req = req.clone({
      setHeaders: {
        Authorization: "Bearer " + this.token,
      },
    });
    return next.handle(req);
  }
}
