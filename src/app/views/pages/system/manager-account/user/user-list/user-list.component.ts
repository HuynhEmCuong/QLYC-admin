import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/core/services/system/user.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { StatusDefineService } from 'src/app/core/services/system/status-define.service';
import { AlertifyService } from 'src/app/core/services/general/alertify.service';
import { AuthService } from 'src/app/core/services/system/auth.service';
import { environment } from 'src/environments/environment';
import { ShareService } from 'src/app/core/services/general/share.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild("modalChild", { static: false }) modalChild;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  apiUrl = environment.apiUrl;
  dataSource:any;
  dataSourceStatus:any;
  constructor(
    private userService: UserService,
    private alertService: AlertifyService,
    private authService: AuthService,
    private shareService:ShareService
    ) {
    this.showModal = this.showModal.bind(this);
    this.resetPassword  =this.resetPassword.bind(this);
    this.fnDelete = this.fnDelete.bind(this);
    this.dataSourceStatus = [
      { id: 1, name: "Hoạt động" },
      { id: 0, name: "Khoá" }
    ];
   }

  ngOnInit() {
    this.dataSource= this.userService.loadDataGrid();
  }

  loadInit(){
    this.dataSource.reload();
  }

  showModal(e){
    this.modalChild.showChildModal(e.row.data);
  }

  resetPassword(e){
    this.alertService.confirmWarning("Bạn có muốn đặt lại mật khẩu mặc định (eiu@123)?",()=>{
        this.authService.resetPassword(e.row.data.id).subscribe(res=>{
          let result = res as any;
          if(result.success){
            this.alertService.success("Đặt lại mật khẩu thành công !");
          }
          else{
            this.alertService.error(result.message);
          }
        });
    })
  }

  fnDelete(e){
    let id = e.row.data.id;
    this.shareService.deleteRowGrid(id,this.userService,()=>{
      this.dataSource.reload();
    })
  }

  reloadGrid(){
    this.dataSource.reload();
  }


}
