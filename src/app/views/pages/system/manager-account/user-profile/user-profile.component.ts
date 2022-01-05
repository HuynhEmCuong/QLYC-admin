import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from 'rxjs';
import { take } from 'rxjs/operators';
import { NotificationStatus } from 'src/app/core/enums/notification-status';
import { ChangePassword } from 'src/app/core/models/dtos/change-password';
import { UserToken } from 'src/app/core/models/dtos/user-token';
import { Pager } from 'src/app/core/models/general/pagination';
import { NotificationViewModel } from 'src/app/core/models/notification/notification';
import { OperationResult } from 'src/app/core/models/system/operation-result';
import { User } from 'src/app/core/models/system/user';
import { AlertifyService } from 'src/app/core/services/general/alertify.service';
import { StoreService } from 'src/app/core/services/general/store.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { AuthService } from 'src/app/core/services/system/auth.service';
import { UserService } from 'src/app/core/services/system/user.service';
import { environment } from 'src/environments/environment';
const API_URL = environment.apiUrl;
declare const $:any
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user:User = new User();
  userLogin:UserToken;
  modelPassword: ChangePassword=  new ChangePassword();
  pager:Pager<NotificationViewModel> = new Pager<NotificationViewModel>();
  itemPerPage=10;
  showLoading:boolean=false;

  public seenStatus: typeof NotificationStatus = NotificationStatus;
  constructor(
    private userService:UserService,
    public authService:AuthService,
    private alertService:AlertifyService,
    private notificationService:NotificationService,
    private storeService:StoreService,
    private router: Router
    ) {
    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      this.userLogin = user;
    })
   }

  async ngOnInit() {
    this.user = await this.userService.findById(this.userLogin.id).toPromise().then();

  }



   seenNotification(item:NotificationViewModel){
    if(item.IsSeen==this.seenStatus.NotSeen){
       this.notificationService.seenNotification(item.Id).subscribe(res=>{
       });

    }

    if(item.Link!=null)
      this.router.navigateByUrl(item.Link);
}

  async changePassword(){
    if(this.modelPassword.newPassword.length<5){
      this.alertService.error("Mật khẩu mới phải lớn hơn 5 ký tự!");
      return;
    }
    if(this.modelPassword.newPassword!==this.modelPassword.reNewPassword){
      this.alertService.error("Mật khẩu không khớp");
      return;
    }

    let result:any = await this.authService.changePassword(this.user.Id,this.modelPassword.newPassword).toPromise().then();
    if(result.Success){
      this.alertService.success(result.Message);
      $("#modal-change-password").modal('hide');

    }else{
      this.alertService.error(result.Message);
    }
  }




}
