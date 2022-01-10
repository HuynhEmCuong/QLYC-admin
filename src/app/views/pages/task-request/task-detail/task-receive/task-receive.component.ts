import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestStatus } from 'src/app/core/enums/requestStatus.enum';
import { UserToken } from 'src/app/core/models/dtos/user-token';
import { User } from 'src/app/core/models/system/user';
import { StudentTask } from 'src/app/core/models/task-request/request-task';
import { AlertifyService } from 'src/app/core/services/general/alertify.service';
import { AuthService } from 'src/app/core/services/system/auth.service';
import { UserService } from 'src/app/core/services/system/user.service';
import { TaskRequestService } from 'src/app/core/services/task-request/task-request.service';

@Component({
  selector: 'app-task-receive',
  templateUrl: './task-receive.component.html',
  styleUrls: ['./task-receive.component.css']
})
export class TaskReceiveComponent implements OnInit {
  userId: string;
  users :User[];
  @Input() taskRequest: StudentTask
  @Output() data = new EventEmitter<StudentTask>()

  constructor(
    private _taskRequest: TaskRequestService,
    private _alert: AlertifyService,
    private _auth: AuthService,
    private _user:UserService
  ) { 
    this._auth.currentUser$.subscribe(res => this.userId = res.id);
  }

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser(){
    this._user.getAll().subscribe(res =>{
      this.users = res;
    })
  }

  receiveTask() {
    //Update status and reciver 
    this.taskRequest.receiverId = +this.userId;
    this.taskRequest.status = RequestStatus.doing;
    this._taskRequest.update(this.taskRequest).subscribe(res => {
      if (res.success) {
        this._alert.success("Update thành công")
        this.taskRequest = res.data;
        this.emitData()
      } else {
        this._alert.error("Lỗi hệ thống")
      }
    })
  }

  emitData() {
    this.data.emit(this.taskRequest)
  }

}
