import { Component, EventEmitter, Injectable, OnInit, Output, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { cloneData } from 'src/app/core/common/helper';
import { User } from 'src/app/core/models/system/user';
import { AlertifyService } from 'src/app/core/services/general/alertify.service';
import { ShareService } from 'src/app/core/services/general/share.service';
import { RoleService } from 'src/app/core/services/system/role.service';
import { StatusDefineService } from 'src/app/core/services/system/status-define.service';
import { UserService } from 'src/app/core/services/system/user.service';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.css']
})
export class UserActionComponent implements OnInit {

  @ViewChild("childModal", { static: false }) childModal: ModalDirective;
  @ViewChild("targetForm", { static: true }) targetForm: DxFormComponent;
  @Output() loadInit = new EventEmitter<void>();

  entity: User = new User();
  usernamePattern ='^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$';
  phonePattern= '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$';
  emailPattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$';
  dataSourceStatus:any ;
  dataSourceRoles:any;
  isLoading:boolean= false;

  constructor(
    private alertService:AlertifyService,
    private userService:UserService,
    private roleService:RoleService,
    private statusDefineService: StatusDefineService,
    private shareService:ShareService)
    {
      this.validation =this.validation.bind(this);
    }

  async ngOnInit() {
    this.entity.Status =1;
    this.dataSourceRoles = this.roleService.loadDataSourceLookup();
    this.dataSourceStatus = this.statusDefineService.loadDataSourceLookupFilter(["Code","=","USER"]);
    await this.dataSourceStatus.load();
  }

  fnSave() {
    let validation: any = this.targetForm.instance.validate();
    this.shareService.validateDxForm(validation,(isValid) => {
      if(isValid) {
        this.isLoading = true;
        this.shareService.action(this.entity,this.userService,(response)=>{
          if(response.Success){
            this.childModal.hide();
            this.loadInit.emit();
          }
          this.isLoading= false;
        })
      }
    })
  }

  async showChildModal(item) {
    if(item!=null){
      this.entity =await this.userService.findById(item.Id).toPromise().then();

    }
    else{
      this.entity = new User();
      let self = this;
      setTimeout(function(){
        self.targetForm.instance.resetValues();
        self.entity = new User();
        self.entity.Status =1;
        self.entity.Roles = ["Admin"];
      })
    }
    this.childModal.show();
  }

  validation(e){
    let model = new User();
    model.Status = model.Status||1;
    model.UserName =e.value;
    model.Id = this.entity.Id;
    return this.userService.validate(model).toPromise();
  }

  valueChangeImageCrop(urlImage){
    if(urlImage!=null)
      this.entity.Avatar =urlImage;
  }

  tagBoxTemplate(itemData: any) {
    return `<div class="dx-tag-content" style="padding-right: 10px">
         <span>${itemData.Name}</span>
       </div>`;
}
}
