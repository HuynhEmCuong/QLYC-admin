import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartService } from 'src/app/core/services/depart/depart.service';

@Component({
  selector: 'app-depart-list',
  templateUrl: './depart-list.component.html',
  styleUrls: ['./depart-list.component.css']
})
export class DepartListComponent implements OnInit {
  @ViewChild("modalAction", { static: false }) modalAction;
  dataSource: any
  dataStatus: any
  constructor(private _service: DepartService) { 
    this.onReditDetail = this.onReditDetail.bind(this)
  }

  ngOnInit() {
    this.dataSource = this._service.loadDataGrid();

    this.dataStatus = [{
      id: 1, name: 'Hoạt động '
    }, {
      id: 2, name: 'Đã khoá'
    }]
  }
  loadInit(){
    this.dataSource.reload();
  }

  onReditDetail(e) {
    let data = e.row.data;
    this.modalAction.showModal(data);
  }

  onCellPrepared(e) {
    if (e.data != null && e.data.status == 3) {
      if (e.rowType == 'data') {
        e.cellElement.style.background = 'green'
        e.cellElement.style.color = 'white'
      }
    }
  }
}
