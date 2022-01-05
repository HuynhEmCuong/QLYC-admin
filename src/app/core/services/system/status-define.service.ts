import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { StatusDefine } from '../../models/system/status-define';
import { BaseService } from '../general/base.service';
import { AuthService } from './auth.service';

const ApiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class StatusDefineService extends BaseService<StatusDefine> {

  constructor(authService:AuthService,http: HttpClient, title:Title)
  {
    super(authService, http,"StatusDefine", title);
  }

  getStatusDefineByCode = (codeStatus) => this.http.get(`${ApiUrl}/StatusDefine/GetStatusDefineByCode?codeStatus=${codeStatus}`);

}
