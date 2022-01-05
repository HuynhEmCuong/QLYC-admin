import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from "@angular/core";
import { Subscription } from 'rxjs';
import { UserToken } from '../models/dtos/user-token';
import { User } from '../models/system/user';
import { AuthService } from '../services/system/auth.service';
import * as _ from 'lodash';
import { PermissionService } from '../services/system/permission.service';
import { PermissionConst } from '../const/role.const';
@Directive({
  selector:"[rbacAllowArr]"
})

export class RbacAllowArrDirective implements OnDestroy{
  _functionCode:string;
  _action:string;
  _operator: string;
  user:UserToken;
  sub:Subscription;
  flag: boolean = true;
  constructor(
    private templateRef:TemplateRef<any>,
    private viewContainer:ViewContainerRef,
    private authService:AuthService,
    private permissionService:PermissionService
  ){
   this.sub= authService.currentUser$.subscribe(user=>{
      this.user = user;
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  @Input()
  set rbacAllowArr(input: Array<InputPermission>){
    this.viewContainer.clear();
    let index = 0;
    if(input.length > 0){

      input.forEach(x=> {
        this._functionCode= x.Code;
        this._action = x.Action;
        this._operator = x.Operator;

        if(index == 0 )
        {
          if(this._action != 'APPROVAL')
            this.flag = this.flag && this.permissionService.hasPermission(this._functionCode,this._action);
          else {
            if(this._functionCode == 'ISSUE')
              this.flag = this.flag && this.user.roles.find(x=>x == PermissionConst.APPROVER_ISSUE);
            else
              this.flag = this.flag && this.user.roles.find(x=>x == PermissionConst.APPROVER_CONTRACT);
          }
        }else {
          if(this._action != 'APPROVAL'){
            if(input[index-1].Operator == 'AND')
            this.flag = this.flag && this.permissionService.hasPermission(this._functionCode,this._action);

            if(input[index-1].Operator == 'OR')
            this.flag = this.flag || this.permissionService.hasPermission(this._functionCode,this._action);
          }
          else{
            if(this._functionCode == 'ISSUE'){
              if(input[index-1].Operator == 'AND')
              this.flag = this.flag && this.user.roles.find(x=>x == PermissionConst.APPROVER_ISSUE);
              if(input[index-1].Operator == 'OR')
              this.flag = this.flag || this.user.roles.find(x=>x == PermissionConst.APPROVER_ISSUE);
            }
            if(this._functionCode == 'CONTRACT'){
              if(input[index-1].Operator == 'AND')
              this.flag = this.flag && this.user.roles.find(x=>x == PermissionConst.APPROVER_CONTRACT);
              if(input[index-1].Operator == 'OR')
              this.flag = this.flag || this.user.roles.find(x=>x == PermissionConst.APPROVER_CONTRACT);
            }
          }

        }
        index ++;
      });

      if(!this.flag)
      {
        this.viewContainer.clear();
      }else{
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    }

  }
}

export class InputPermission{
  Action:string
  Code:string
  Operator: string
}
