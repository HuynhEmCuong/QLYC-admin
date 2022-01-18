import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Department } from '../../models/depart/depart';
import { BaseService } from '../general/base.service';
import { AuthService } from '../system/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DepartService extends BaseService<Department> {

  constructor(authService: AuthService, http: HttpClient, title: Title,) {
    super(authService, http, "Department", title)
  }

  

}
