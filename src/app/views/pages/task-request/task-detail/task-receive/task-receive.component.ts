import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
  @Input() users: User[];
  @Input() studentTask: StudentTask 
  @Output() data = new EventEmitter<StudentTask>()

  constructor(
    private _taskRequest: TaskRequestService,
    private _alert: AlertifyService,
    private _auth: AuthService,
   
    private _sniper: NgxSpinnerService
  ) {
    this._auth.currentUser$.subscribe(res => this.userId = res.id);
  }

  ngOnInit() {
  }

  

  receiveTask() {
    this._sniper.show();
    //Update status and reciver 
    this.studentTask.taskRequest.receiverId = +this.userId;
    this.studentTask.taskRequest.status = RequestStatus.doing;
    this.studentTask.taskRequest.requestType = this.studentTask.requestType;
    this._taskRequest.update(this.studentTask.taskRequest).subscribe(res => {
      if (res.success) {
        this._sniper.hide();
        this.studentTask.appUser = res.data.appUser;
        this.studentTask.taskRequest.assignDate = res.data.assignDate;
        this.studentTask.taskRequest.intendTime  = res.data.intendTime;
        this._alert.success("Update thành công")
        this.emitData()
      } else {
       
        this._alert.error("Lỗi hệ thống")
      }
      this._sniper.hide();
     
    })
  }

  emitData() {
    this.data.emit(this.studentTask)
  }

}
