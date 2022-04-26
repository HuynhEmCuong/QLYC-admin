import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserToken } from '../../models/dtos/user-token';
import { OperationResult } from '../../models/system/operation-result';
import { AlertifyService } from '../general/alertify.service';
const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: UserToken = new UserToken();
  private currentUserSource = new ReplaySubject<UserToken>(1);
  currentUser$ = this.currentUserSource.asObservable();
  redirectUrl: string;
  jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient,
    private router: Router,
    private alertService: AlertifyService,
  ) {
  }


  login(model: any) {
    return this.http.post(`${API_URL}/Authen/Login`, model).pipe(
      map((response: OperationResult) => {
        if (response.success) {
          this.setCurrentUser(this.setUserToken(response));
        }
        return response;
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigate(['/auth/login']);
  }


  isLoggedIn() {
    const token = this.currentUser.token;
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  setUserToken(response: OperationResult): UserToken {

    let userDecode = this.jwtHelper.decodeToken(response.data.token);
    let user = new UserToken();
    user.avatar = userDecode.avatar;
    user.email = userDecode.email;
    user.id = userDecode.id;
    user.name = userDecode.name;
    user.permissions = response.data.Permission;
    user.phonenumber = userDecode.phonenumber;
    user.roles = JSON.parse(userDecode.roles);
    user.unique_name = userDecode.unique_name;
    user.token = response.data.token;
    user.refresh_token = response.data.RefreshToken;
    return user;
  }

  setCurrentUser(user: UserToken) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(this.currentUser));
    this.currentUserSource.next(this.currentUser);
  }

  getTokenExpirationDate() {
    return this.jwtHelper.getTokenExpirationDate(this.currentUser.token);
  }

  refreshToken() {
    let model = {
      token: this.currentUser.token,
      refreshToken: this.currentUser.refresh_token
    };
    return this.http.post<OperationResult>(`${API_URL}/Authen/RefreshToken`, model).pipe(
      map((response: OperationResult) => {
        if (response.success) {
          this.setCurrentUser(this.setUserToken(response));
        }
        return response;
      })
    );
  }

  checkRole() {
    let user: UserToken = JSON.parse(localStorage.getItem("user"));
    if (user.roles.find(role => role.toUpperCase() == 'ADMIN')) {
      return true;
    } else
      return false;
  }

  checkTask(userIdRecevier: string): boolean {
    
    let user: UserToken = JSON.parse(localStorage.getItem("user"));

    if (user.id == userIdRecevier || user.roles.find(role => role.toUpperCase() == 'ADMIN')) {
      return true;
    }
    else {
      return false
    }
  }

  forgotPassword = (email) => this.http.get(`${API_URL}/Authen/ForgotPassword?Email=${email}`);

  resetPassword = (id) => this.http.get(`${API_URL}/Authen/ResetPassword?id=${id}`);

  changePassword = (id, password) => this.http.get(`${API_URL}/Authen/ChangePassword?id=${id}&password=${password}`);
}
