import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StatusDefine } from '../../models/system/status-define';
import { Function } from '../../models/system/function';
import { BaseService } from '../general/base.service';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FunctionService extends BaseService<Function> {

  constructor(authService: AuthService, http: HttpClient, title: Title) {
    super(authService, http, "Function", title);
  }

  getFunctionCodeByLink = (link) => this.http.get(environment.apiUrl + '/Function/GetFunctionCodeByLink?link=' + link);

}
