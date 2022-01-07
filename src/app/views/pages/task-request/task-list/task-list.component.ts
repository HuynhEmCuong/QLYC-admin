import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskRequestService } from 'src/app/core/services/task-request/task-request.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  dataSource: any
  dataStatusRequest: any
  constructor(private _service: TaskRequestService, public route: Router) {
    this.dataStatusRequest = [
      {
        id: 1, name: 'Đã nhận'
      }, {
        id: 2, name: 'Đang xữ lý'
      },{
        id: 3, name: 'Hoàn thành'
      }
    ];
    this.onReditDetail = this.onReditDetail.bind(this)
  }

  ngOnInit() {
    this.dataSource = this._service.loadDataGrid();
  }

  reloadData = () => this.dataSource.reload()

  onCellPrepared(e) {
    if (e.data != null && e.data.status == 3) {
      if (e.rowType == 'data') {
        e.cellElement.style.background = 'green'
        e.cellElement.style.color = 'white'
      }
    }
  }

  onReditDetail(e) {
    debugger
    let data = e.row.data;
    this.route.navigateByUrl(`/pages/task-request/detail/${data.id}`)
  }
}
