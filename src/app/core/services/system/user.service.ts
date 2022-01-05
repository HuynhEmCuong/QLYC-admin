import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from '../../models/system/user';
import { BaseService } from '../general/base.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService  extends BaseService<User> {

  constructor(authService:AuthService,http: HttpClient, title:Title)
  {
    super(authService, http,"User", title);
  }

}
