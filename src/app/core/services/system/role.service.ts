import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Role } from '../../models/system/role';
import { BaseService } from '../general/base.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService<Role> {

  constructor(authService:AuthService,http: HttpClient, title:Title)
  {
    super(authService, http,"Role", title);
  }

}
