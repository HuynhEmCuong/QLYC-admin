import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { cloneData } from 'src/app/core/common/helper';
import { Role } from 'src/app/core/models/system/role';
import { AlertifyService } from 'src/app/core/services/general/alertify.service';
import { ShareService } from 'src/app/core/services/general/share.service';
import { StatusDefineService } from 'src/app/core/services/system/status-define.service';
import { RoleService } from 'src/app/core/services/system/role.service';

@Component({
  selector: 'app-role-action',
  templateUrl: './role-action.component.html',
  styleUrls: ['./role-action.component.css']
})
export class RoleActionComponent implements OnInit {

   @ViewChild("childModal", { static: false }) childModal: ModalDirective;
  @ViewChild("targetForm", { static: true }) targetForm: DxFormComponent;
  @Output() loadInit = new EventEmitter<void>();

  entity: Role = new Role();
  dataSourceStatus:any ;
  isLoading:boolean= false;

  constructor(
    private alertService:AlertifyService,
    private roleService:RoleService,
    private statusDefineService: StatusDefineService,
    private shareService:ShareService)
    {
      this.validateName = this.validateName.bind(this);
    }

  async ngOnInit() {
    this.dataSourceStatus = this.statusDefineService.loadDataSourceLookupFilter(["Code","=","Role"]);
    await this.dataSourceStatus.load();
  }

  fnSave() {
    let validation: any = this.targetForm.instance.validate();
   this.shareService.validateDxForm(validation,(isValid) => {
      if(isValid) {
        this.isLoading = true;
        this.shareService.action(this.entity,this.roleService,()=>{
          this.isLoading= false;
          this.childModal.hide();
          this.loadInit.emit();
        })
      }
   })
  }
  async validateName(e){
    let model = cloneData(this.entity) as Role;
    model.Name =e.value;

    var operationResult:any = await this.roleService.validate(model);
    if(!operationResult.Success){
      if(operationResult.Caption == 'Exist'){
        e.rule.message = 'Mã đã tồn tại';
        return false;
      }
      if(operationResult.Caption == 'CodeSign'){
        e.rule.message = 'Mã phải là chuỗi viết liền không dấu';
        return false;
      }
    }

    return true;
  }

  showChildModal(item) {
    if(item!=null){
      this.entity = cloneData(item);
    }
    else{
      this.entity = new Role();
      let self = this;
      setTimeout(function(){
        self.targetForm.instance.resetValues();
      })
    }
    this.childModal.show();
  }


}
