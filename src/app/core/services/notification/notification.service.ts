import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pager } from '../../models/general/pagination';
import { NotificationViewModel, ResponseNotify } from '../../models/notification/notification';
import { BaseService } from '../general/base.service';
import { AuthService } from '../system/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseService<Notification>  {

  constructor(authService:AuthService,http: HttpClient, title: Title) {
    super( authService,http, "Notification", title);
  }

  seenNotification=(id)=>this.http.get(environment.apiUrl+ '/Notification/SeenNotification?id='+id);
  seenAllNotification=()=>this.http.get(environment.apiUrl+ '/Notification/ViewAllNotifications');
  loadAllNotificationByUserLogin=()=>this.http.get<ResponseNotify>(environment.apiUrl+ '/Notification/GetAllByUserLogin');
  getNotificationPaginationByUserLogin=(page,pageSize)=>this.http.get<Pager<NotificationViewModel>>(environment.apiUrl+ `/Notification/GetNotificationPaginationByUserLoginAsync?page=${page}&pageSize=${pageSize}`);
  deleteListNotification=(models)=>this.http.post(environment.apiUrl+ `/Notification/DeleteListNotification`,models);
}
