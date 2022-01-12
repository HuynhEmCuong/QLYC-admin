import { Component, Input, OnInit } from '@angular/core';
import { StudentTask } from 'src/app/core/models/task-request/request-task';

@Component({
  selector: 'app-task-complete',
  templateUrl: './task-complete.component.html',
  styleUrls: ['./task-complete.component.css']
})
export class TaskCompleteComponent implements OnInit {
  @Input() taskRequest: StudentTask;
  constructor() { }

  ngOnInit() {
  }

}
