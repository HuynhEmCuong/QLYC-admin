import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Stepper from 'bs-stepper';
import { UserToken } from 'src/app/core/models/dtos/user-token';
import { StudentTask, TaskRequest } from 'src/app/core/models/task-request/request-task';
import { AuthService } from 'src/app/core/services/system/auth.service';
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  studentTask: StudentTask;
  private stepper: Stepper;
  constructor(private _routeActive: ActivatedRoute,
  ) {
    this._routeActive.data.subscribe((res) => {

      this.studentTask = new StudentTask(res.task)
      this.studentTask.appUser = res.task.appUser
      this.studentTask.requestType = res.task.requestType
      this.studentTask.student = res.task.student
    });
  }

  ngOnInit() {
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
