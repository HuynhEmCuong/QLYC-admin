import { Component, OnInit, ViewChild } from '@angular/core';
import { ShareService } from 'src/app/core/services/general/share.service';
import { RequestTypeService } from 'src/app/core/services/request-type/request-type.service';

@Component({
  selector: 'app-request-type-list',
  templateUrl: './request-type-list.component.html',
  styleUrls: ['./request-type-list.component.css']
})
export class RequestTypeListComponent implements OnInit {
  @ViewChild("modalAction", { static: false }) modalAction;
  dataSource: any
  dataStatus: any
  constructor(private readonly _taskRequest:RequestTypeService,
    private shareService:ShareService) { 
      this.onReditDetail = this.onReditDetail.bind(this);
      this.fnDelete = this.fnDelete.bind(this);
    }

  ngOnInit() {
    this.dataSource = this._taskRequest.loadDataGrid();
    
    this.dataStatus = [{
      id: 1, name: 'Hoạt động '
    }, {
      id: 2, name: 'Đã khoá'
    }]
  }

  fnDelete(e){
    let id = e.row.data.id;
    this.shareService.deleteRowGrid(id,this._taskRequest,()=>{
      this.dataSource.reload();
    })
  }

  loadInit(){
    this.dataSource.reload();
  }


  onReditDetail(e) {
    let data = e.row.data;
    this.modalAction.showModal(data);
  }

}
