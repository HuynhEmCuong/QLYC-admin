import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { take } from 'rxjs/operators';
import { UserToken } from '../models/dtos/user-token';
import { AuthService } from '../services/system/auth.service';

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  private user:UserToken;
  constructor(private authService: AuthService,private router: Router) {
    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.user!=null &&this.user.token!=""){
      if (this.authService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigate(["/auth/lock"], {
          queryParams: {
            returnUrl: state.url,
          },
        });
        return false;
      }
    }
    else{
      this.router.navigate(["/auth/login"], {
        queryParams: {
          returnUrl: state.url,
        },
      });
      return false;
    }


  }
}
