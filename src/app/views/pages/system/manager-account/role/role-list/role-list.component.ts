import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { PermissionConst } from 'src/app/core/const/role.const';
import { AlertifyService } from 'src/app/core/services/general/alertify.service';
import { ShareService } from 'src/app/core/services/general/share.service';
import { AuthService } from 'src/app/core/services/system/auth.service';
import { RoleService } from 'src/app/core/services/system/role.service';
import { StatusDefineService } from 'src/app/core/services/system/status-define.service';
import { UserService } from 'src/app/core/services/system/user.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  @ViewChild("modalChild", { static: false }) modalChild;
  @ViewChild("permission", { static: false }) permission;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  dataSource:any;
  dataSourUser:any;
  public roleConst: typeof PermissionConst = PermissionConst;
  constructor(
    private roleSerice: RoleService,
    private userService: UserService,
    private alertService: AlertifyService,
    private authService: AuthService,
    private shareService:ShareService
    ) {
    this.showModal = this.showModal.bind(this);
    this.fnDelete = this.fnDelete.bind(this);
   }

  ngOnInit() {
    this.dataSource= this.roleSerice.loadDataGrid();
    this.dataSourUser = this.userService.loadStoreLookup();
  }

  loadInit(){
    this.dataSource.reload();
  }
  showModal(e){
    this.modalChild.showChildModal(e.row.data);
  }

  fnDelete(e){
    let id = e.row.data.Id;
    this.shareService.deleteRowGrid(id,this.roleSerice,()=>{
      this.dataSource.reload();
    })
  }

  onPermission(e){
    this.permission.showChildModal(e.row.data)
  }

  reloadGrid(){
    this.dataSource.reload();
  }

}
