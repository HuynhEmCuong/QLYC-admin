import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { NotificationStatus } from 'src/app/core/enums/notification-status';
import { UserToken } from 'src/app/core/models/dtos/user-token';
import {  NotificationViewModel } from 'src/app/core/models/notification/notification';
import { OperationResult } from 'src/app/core/models/system/operation-result';
import { StoreService } from 'src/app/core/services/general/store.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { AuthService } from 'src/app/core/services/system/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  message:any;
  notifications:NotificationViewModel[];
  countNewNotification=0;
  user:UserToken;
  public seenStatus: typeof NotificationStatus = NotificationStatus;
  constructor(
    public authService:AuthService,
    private notificationService:NotificationService,
    private storeService:StoreService,
    private router: Router) {
    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    })


    this.storeService.notifications$.subscribe(res=>{
      this.notifications = res.data;
       this.countNewNotification = res.countNew;
    });
  }


  ngOnInit() {

  }

  viewAll(){
    this.notificationService.seenAllNotification().subscribe((res:any)=>{
      if(res.Success){
        this.notificationService.loadAllNotificationByUserLogin().subscribe(res=>{
          this.notifications = res.data;
          this.countNewNotification = res.countNew;
        });
      }

      this.router.navigateByUrl("/pages/system/profile");

    })
  }

  async seenNotification(item:NotificationViewModel){
      if(item.IsSeen==this.seenStatus.NotSeen){
        var result:OperationResult=await this.notificationService.seenNotification(item.Id).toPromise().then();
        if(result.Success){
          this.notificationService.loadAllNotificationByUserLogin().subscribe(res=>{
            this.notifications = res.data;
            this.countNewNotification = res.countNew;
          });
        }
      }

      if(item.Link!=null)
        this.router.navigateByUrl(item.Link);
  }

}
