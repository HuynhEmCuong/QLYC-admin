import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserToken } from 'src/app/core/models/dtos/user-token';
import { AlertifyService } from 'src/app/core/services/general/alertify.service';
import { TaskRequestService } from 'src/app/core/services/task-request/task-request.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  user: UserToken = JSON.parse(localStorage.getItem("user"));
  dataSource: any
  dataStatusRequest: any
  constructor(private _service: TaskRequestService, public route: Router,
    private _alert: AlertifyService
  ) {
    this.dataStatusRequest = [
      {
        id: 1, name: 'Đã nhận'
      }, {
        id: 2, name: 'Đang xữ lý'
      }, {
        id: 3, name: 'Hoàn thành'
      },
      , {
        id: 4, name: 'Đã huỷ'
      }
    ];
    this.onReditDetail = this.onReditDetail.bind(this)
  }

  ngOnInit() {
    this.dataSource = this._service.loadDataGrid();

  }

  reloadData = () => this.dataSource.reload()

  onCellPrepared(e) {
    if (e.data != null && e.rowType == 'data' && e.columnIndex == 6) {
      console.log(e)
      switch (e.data.status) {
        case 1:
          e.cellElement.style.background = '#3778c2'
          break;
        case 2:
          e.cellElement.style.background = '#FF6A3D'
          break;
        case 3:
          e.cellElement.style.background = 'green'
          break;
        case 4:
          e.cellElement.style.background = '#949494'
          break;
      }

      e.cellElement.style.color = 'white'
    }
  }

  onReditDetail(e) {
    let data = e.row.data;
    if (data.status == 2) {
      if (+this.user.id === data.requestId || +this.user.id == 1) {
        this.route.navigateByUrl(`/pages/task-request/detail/${data.id}`)

      } else {
        this._alert.error("Bạn không được quyền vào công việc này")
        return;
      }
    } else {
      this.route.navigateByUrl(`/pages/task-request/detail/${data.id}`)
    }

  }
}
