import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StatusDefine } from '../../models/system/status-define';
import { Function } from '../../models/system/function';
import { BaseService } from '../general/base.service';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { EmailLog } from '../../models/system/email-log';

@Injectable({
  providedIn: 'root'
})
export class EmailLogService  extends BaseService<EmailLog> {

constructor(authService:AuthService,http: HttpClient, title:Title) {
  super(authService, http,"EmailLog", title);
}
}
