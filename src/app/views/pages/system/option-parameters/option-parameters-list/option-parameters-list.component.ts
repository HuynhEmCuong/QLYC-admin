import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { StatusDefineService } from 'src/app/core/services/system/status-define.service';
import { AlertifyService } from 'src/app/core/services/general/alertify.service';
import { AuthService } from 'src/app/core/services/system/auth.service';
import { OptionParameterService } from 'src/app/core/services/system/option-parameters.service';
import { ShareService } from 'src/app/core/services/general/share.service';

@Component({
  selector: 'app-option-parameters-list',
  templateUrl: './option-parameters-list.component.html',
  styleUrls: ['./option-parameters-list.component.css']
})
export class OptionParametersListComponent implements OnInit {
  @ViewChild("modalChild", { static: false }) modalChild;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  dataSource:any;
  //dataSourceStatus:any;
  constructor(private optionParametersService: OptionParameterService,
              private shareService:ShareService,
              private statusDefineService: StatusDefineService,
              private alertService: AlertifyService,
              private authService: AuthService) {
    this.showModal = this.showModal.bind(this);
    this.fnDelete = this.fnDelete.bind(this);
   }

  ngOnInit() {
    this.dataSource= this.optionParametersService.loadDataGrid();
  }

  loadInit(){

    this.dataSource.reload();
  }
  showModal(e){
    this.modalChild.showChildModal(e.row.data);
  }

  fnDelete(e){
    let id = e.row.data.Id;
    this.shareService.deleteRowGrid(id,this.optionParametersService,()=>{
      this.dataSource.reload();
    })
  }

  reloadGrid(){
    this.dataSource.reload();
  }

}
