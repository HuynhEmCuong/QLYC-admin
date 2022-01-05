import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OptionParameter } from '../../models/system/option-parameters';

import { BaseService } from '../general/base.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OptionParameterService extends BaseService<OptionParameter> {

  constructor(authService:AuthService,  http: HttpClient,  title: Title)
  {
    super(authService,http,"OptionParameter", title);
  }

}
