import { Component, Input, OnInit } from '@angular/core';
import { StudentTask } from 'src/app/core/models/task-request/request-task';

@Component({
  selector: 'app-task-handing',
  templateUrl: './task-handing.component.html',
  styleUrls: ['./task-handing.component.css']
})
export class TaskHandingComponent implements OnInit {
  @Input() taskRequest: StudentTask
  
  constructor() { }

  ngOnInit() {
  }

  handleFileInput(e){

  }

}
