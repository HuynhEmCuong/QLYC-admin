import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationViewModel, ResponseNotify } from '../../models/notification/notification';
import { OperationResult } from '../../models/system/operation-result';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private notifications = new BehaviorSubject<ResponseNotify>(new ResponseNotify());
  notifications$ = this.notifications.asObservable();

 constructor(private alertService:AlertifyService,private http: HttpClient) { }


}
