import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/system/auth.service';
import * as _ from 'lodash';
import { UserToken } from '../models/dtos/user-token';
import { FunctionService } from '../services/system/function.service';
import { PermissionService } from '../services/system/permission.service';
import { AlertifyService } from '../services/general/alertify.service';
export class AuthorizationGuard implements CanActivate {
  user: UserToken;
  constructor(
    private authService: AuthService,
    private router: Router,
    private functionService: FunctionService,
    private permissionService: PermissionService,
    private alertService: AlertifyService
  ) {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.authService.isLoggedIn()) {
      let code: string = await this.functionService
        .getFunctionCodeByLink(state.url)
        .toPromise()
        .then();

      if (code != '') {
        if (code == 'ISSUE-DASHBOARD')
          code = 'ISSUE'
        if (code == 'CONTRACT-DASHBOARD')
          code = 'CONTRACT'

        if (state.url.includes('action/')) {
          if (
            this.permissionService.hasPermission(code, 'UPDATE') ||
            this.permissionService.hasPermission(code, 'APPROVAL') ||
            this.permissionService.hasPermission(code, 'READ')
          )
            return true;

          this.alertService.error('Bạn chưa được cấp quyền chỉnh sửa trang này! Liên hệ Administrator');
          this.router.navigateByUrl('/');

        } else
          if (state.url.includes('action')) {
            if (this.permissionService.hasPermission(code, 'CREATE')) return true;

            this.alertService.error('Bạn chưa được cấp quyền thêm mới trang này! Liên hệ Administrator');
            this.router.navigateByUrl('/');
          }
          else {
            if (this.permissionService.checkAccess(code)) {
              return true;
            }
            else {
              this.alertService.error('Bạn chưa được cấp quyền truy cập vào trang này! Liên hệ Administrator');
              this.router.navigateByUrl('/');
            }
          }
      } else {
        return true;
      }
    }
  }
}
