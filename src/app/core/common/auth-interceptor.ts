import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { tap, catchError, switchMap, take, finalize, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/system/auth.service';
import { AlertifyService } from '../services/general/alertify.service';
import { UserToken } from '../models/dtos/user-token';
import { OperationResult } from '../models/system/operation-result';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  isTokenRefreshing: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private user:UserToken
  constructor(private authService: AuthService, public cookieService: CookieService,private router: Router,private alertService:AlertifyService){

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    })
    return next.handle(this.attachTokenToRequest(request)).pipe(
      tap((event : HttpEvent<any>) => {
        return event;
      }),
      catchError((err:HttpErrorResponse) : Observable<any> => {
         if(err.status!=200){
            this.alertService.error(err.error);
         }
         return throwError(err);
      })

     );
  }

  private attachTokenToRequest(request: HttpRequest<any>){
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.user?.token}`,
      }
    });
  }
}
