import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FMsDefine } from '../../models/system/fms-define';
import { StatusDefine } from '../../models/system/status-define';
import { BaseService } from '../general/base.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FMsDefineService extends BaseService<FMsDefine>  {

constructor(authService:AuthService,http: HttpClient, title:Title) {
  super(authService, http,"FMsDefine", title);
}

}
