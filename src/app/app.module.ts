import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ThemeModule } from './theme/theme.module';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './views/pages/pages.module';
import { FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda/lib/ladda.module';
import { SharedModule } from './core/shared/shared.module';
import { AuthService } from './core/services/system/auth.service';
import { JwtModule } from '@auth0/angular-jwt/lib/angular-jwt.module';
import { LocationStrategy, HashLocationStrategy, AsyncPipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './views/auth/login/login.component';
import { LockScreenComponent } from './views/auth/lock-screen/lock-screen.component';
import { UserService } from './core/services/system/user.service';
import { AlertifyService } from './core/services/general/alertify.service';
import { ShareService } from './core/services/general/share.service';
import { StatusDefineService } from './core/services/system/status-define.service';
import { RoleService } from './core/services/system/role.service';
import { AuthInterceptor } from './core/common/auth-interceptor';
import { environment } from 'src/environments/environment';
import { FileService } from './core/services/system/file.service';;
import { RightSidebarComponent } from './theme/components/right-sidebar/right-sidebar.component';
import { FooterComponent } from './theme/components/footer/footer.component';
import { HeaderComponent } from './theme/components/header/header.component';
import { ModalTimeoutComponent } from './theme/components/modal-timeout/modal-timeout.component';
import { SidebarComponent } from './theme/components/sidebar/sidebar.component';
import { LayoutComponent } from './theme/layout/layout.component';
import { AuthorizationGuard } from './core/guards/authorization.guard';
import { FunctionResolver } from './core/resolvers/function.resolver';
import { PermissionService } from './core/services/system/permission.service';
import { RbacAllowDirective } from './core/directives/rbac-allow.directive';
import { AuthGuard } from './core/guards/auth.guard';
import { TimeagoIntl } from 'ngx-timeago';
import { NotificationService } from './core/services/notification/notification.service';
import { StoreService } from './core/services/general/store.service';
import { EmailLogService } from './core/services/system/email-log.service';
export function tokenGetter() {
  return localStorage.getItem("access_token");
}

const SERVICE = [
    UserService,
    RoleService,
    StatusDefineService,
    AuthService,
    AlertifyService,
    ShareService,
    StoreService,
    FileService,
    PermissionService,
    NotificationService,
    EmailLogService
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LockScreenComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ModalTimeoutComponent,
    RightSidebarComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
    FormsModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ...SERVICE,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    FunctionResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
