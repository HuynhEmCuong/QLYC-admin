import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RequestType } from '../../models/task-request/request-type';
import { BaseService } from '../general/base.service';
import { AuthService } from '../system/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequestTypeService extends BaseService<RequestType> {

  constructor(authService: AuthService, http: HttpClient, title: Title,) {
    super(authService, http, "RequestType", title)
  }


}
