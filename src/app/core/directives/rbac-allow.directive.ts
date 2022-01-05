import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from "@angular/core";
import { Subscription } from 'rxjs';
import { UserToken } from '../models/dtos/user-token';
import { User } from '../models/system/user';
import { AuthService } from '../services/system/auth.service';
import * as _ from 'lodash';
import { PermissionService } from '../services/system/permission.service';
@Directive({
  selector:"[rbacAllow]"
})

export class RbacAllowDirective implements OnDestroy{
  _functionCode:string;
  _action:string;
  user:UserToken;
  sub:Subscription;
  constructor(
    private templateRef:TemplateRef<any>,
    private viewContainer:ViewContainerRef,
    private authService:AuthService,
    private permissionService:PermissionService
  ){
   this.sub= authService.currentUser$.subscribe(user=>{
      this.user = user;
      this.showIfUserAllowed();
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  @Input()
  set rbacAllow(input:InputPermission){
    this.viewContainer.clear();
    this._functionCode=input.Code;
    this._action = input.Action;
    this.showIfUserAllowed();
  }
  @Input()

  showIfUserAllowed(){
    this.viewContainer.clear();
    if(this.permissionService.hasPermission(this._functionCode,this._action)){
      this.viewContainer.createEmbeddedView(this.templateRef);
    }else{
      this.viewContainer.clear();
    }
  }

}

export class InputPermission{
  Action:string
  Code:string
}
