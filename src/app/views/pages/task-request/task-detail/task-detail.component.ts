import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Stepper from 'bs-stepper';
import { StudentTask } from 'src/app/core/models/task-request/request-task';
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  taskRequest:StudentTask;
  private stepper: Stepper;
  constructor(private _routeActive: ActivatedRoute) {
    this._routeActive.data.subscribe((res) => {
      this.taskRequest = res.task;
    });
   }

  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: true,
      animation: true
    })
    //Set default step
    // this.stepper.to(2)
  }
  next() {
    this.stepper.next();
  }

  pre() {
    this.stepper.previous();
  }

  to(step){
    this.stepper.to(step)
  }
}
