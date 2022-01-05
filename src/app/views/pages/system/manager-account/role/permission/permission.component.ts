import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Function } from 'src/app/core/models/system/function';
import { Permission } from 'src/app/core/models/system/permision';
import { Role } from 'src/app/core/models/system/role';
import { AlertifyService } from 'src/app/core/services/general/alertify.service';
import { PermissionService } from 'src/app/core/services/system/permission.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {
  @ViewChild("childModal", { static: false }) childModal: ModalDirective;
  @ViewChild("dataGrid", { static: false }) dataGrid: DxDataGridComponent;
  @Output() loadInit = new EventEmitter<void>();
  checkedBox:any;
  functionsParrent:Array<Permission>;
  functions:Array<Permission>;
  isLoading= false;
  role:Role;
  constructor(private permissionService:PermissionService,private alertSerivce:AlertifyService) { }

  ngOnInit() {
  }

  async showChildModal(role){
    this.role = role;
    let functions:any= await this.permissionService.getFuntionsByRole(role.Id).toPromise().then();

    this.functionsParrent =  functions.filter(x=>x.ParentId == 0);

    this.functions  = functions.filter(x=>x.FunctionCode != "ISSUE-DASHBOARD" && x.FunctionCode != "CONTRACT-DASHBOARD");
    this.childModal.show();
  }

  checkAll(e){
    this.functions.map(item=>{
      item.CanDelete =
      item.CanRead =
      item.CanCreate =
      item.CheckRow =
      item.CanUpdate = e.value;
      return item;
    })
  }

  checkRowChange(e){
    if(e.column.dataField =="CheckRow"){
      this.functionsParrent.map(item=>{
        if(item.FunctionId == e.data.FunctionId){
          item.CanDelete = item.CanRead = item.CanCreate = item.CanUpdate = item.CheckRow = e.value;
          e.data.CanDelete = e.data.CanRead = e.data.CanCreate = e.data.CanUpdate= e.data.CheckRow = e.value;
          return item;
        }
      })
    }

  }

  fnSave(){
    this.isLoading = true;
    this.functions.forEach(element => {
      element.RoleId = this.role.Id;
    })
    let model = {
      listPermmission: this.functions,
      roleId: this.role.Id
    };
    this.permissionService.savePermission(model).subscribe(res => {
       this.isLoading = false;
       this.alertSerivce.success("Lưu thành công");
       this.loadInit.emit();
       this.childModal.hide();
    });
  }
}
