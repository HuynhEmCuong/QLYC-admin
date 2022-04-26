import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Stepper from 'bs-stepper';
import { UserToken } from 'src/app/core/models/dtos/user-token';
import { User } from 'src/app/core/models/system/user';
import { StudentTask, TaskRequest } from 'src/app/core/models/task-request/request-task';
import { AuthService } from 'src/app/core/services/system/auth.service';
import { UserService } from 'src/app/core/services/system/user.service';
import { TaskRequestService } from 'src/app/core/services/task-request/task-request.service';
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  studentTask: StudentTask;
  private stepper: Stepper;
  users: User[];
  constructor(private _routeActive: ActivatedRoute,
    private _user: UserService,
    private _taskRequest: TaskRequestService
  ) {
    this._routeActive.data.subscribe((res) => {
      this.studentTask = new StudentTask(res.task);
      this.studentTask.appUser = res.task.appUser
      this.studentTask.requestType = res.task.requestType
      this.studentTask.student = res.task.student
    });
  }

  getAllUser() {
    this._user.getAll().subscribe(res => {
      this.users = res;
    })
  }

  ngOnInit() {
    this.getAllUser();
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: true,
      animation: true
    })
    //Set default step
    this.steperTo(this.studentTask.taskRequest.status === 4 ? 3 : this.studentTask.taskRequest.status)
  }

  updateData($event) {
    this.studentTask = $event;
    this.steperTo(this.studentTask.taskRequest.status === 4 ? 3 : this.studentTask.taskRequest.status)
  }


  steperNext() {
    this.stepper.next();
  }

  steperPre() {
    this.stepper.previous();
  }

  steperTo(step) {
    this.stepper.to(step)
  }
}
