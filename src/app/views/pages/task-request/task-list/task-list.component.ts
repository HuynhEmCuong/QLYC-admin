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
  dataStatusRequest:any
  constructor(private _service:TaskRequestService , public route: Router) { }

  ngOnInit() {
    this.dataSource = this._service.loadDataGrid();
    console.log(this.dataSource);
  }

  reloadData = () => this.dataSource.reload()

}
