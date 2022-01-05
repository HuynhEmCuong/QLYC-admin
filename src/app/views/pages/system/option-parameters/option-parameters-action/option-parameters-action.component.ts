import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppComponent } from 'src/app/app.component';
import { cloneData } from 'src/app/core/common/helper';
import { OptionParameter } from 'src/app/core/models/system/option-parameters';
import { User } from 'src/app/core/models/system/user';
import { AlertifyService } from 'src/app/core/services/general/alertify.service';
import { ShareService } from 'src/app/core/services/general/share.service';
import { OptionParameterService } from 'src/app/core/services/system/option-parameters.service';
import { RoleService } from 'src/app/core/services/system/role.service';
import { StatusDefineService } from 'src/app/core/services/system/status-define.service';
import { UserService } from 'src/app/core/services/system/user.service';
$this: AppComponent;
@Component({
  selector: 'app-option-parameters-action',
  templateUrl: './option-parameters-action.component.html',
  styleUrls: ['./option-parameters-action.component.css']
})
export class OptionParametersActionComponent implements OnInit {

  @ViewChild("childModal", { static: false }) childModal: ModalDirective;
  @ViewChild("targetForm", { static: true }) targetForm: DxFormComponent;
  @Output() loadInit = new EventEmitter<void>();

  entity: OptionParameter = new OptionParameter();
  isLoading:boolean= false;

  constructor(
    private alertService:AlertifyService,
    private optionParameterService:OptionParameterService,
    private shareService:ShareService)
    {
      this.validateCode = this.validateCode.bind(this);
    }

  async ngOnInit() {
  }

  async fnSave(){
    if (!(await this.targetForm.instance.validate().isValid)) {
      return;
    }
    this.isLoading = true;
    this.shareService.action(this.entity,this.optionParameterService,()=>{
      this.isLoading= false;
      this.childModal.hide();
      this.loadInit.emit();
    })
  }

  showChildModal(item) {
    if(item!=null){
      this.entity = cloneData(item);
    }
    else{
      this.entity = new OptionParameter();
      let self = this;
      setTimeout(function(){
        self.targetForm.instance.resetValues();
      })
    }
    this.childModal.show();
  }

  ////Validate Code parameter
  async validateCode(e){
  let model = cloneData(this.entity) as OptionParameter;
    model.Code =e.value;
    var operationResult: any = await this.optionParameterService.validate(model);
    return operationResult.Success;
  }

}
