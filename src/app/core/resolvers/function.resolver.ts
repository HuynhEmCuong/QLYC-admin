import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/system/auth.service';
import { FunctionService } from '../services/system/function.service';
import { Function } from '../models/system/function';
@Injectable()
export class FunctionResolver implements Resolve<Array<Function>> {
    constructor(public authService:AuthService, private functionService: FunctionService) { }

    resolve(router: ActivatedRouteSnapshot): Observable<Array<Function>> {
        return  this.functionService.getAll().pipe(
          map(res=>{
            return res;
          })
         );
    }
}
