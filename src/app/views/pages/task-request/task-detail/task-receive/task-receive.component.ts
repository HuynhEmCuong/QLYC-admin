import { Component, Input, OnInit } from '@angular/core';
import { StudentTask } from 'src/app/core/models/task-request/request-task';

@Component({
  selector: 'app-task-receive',
  templateUrl: './task-receive.component.html',
  styleUrls: ['./task-receive.component.css']
})
export class TaskReceiveComponent implements OnInit {

  @Input() taskRequest :StudentTask
  constructor() { }

  ngOnInit() {
  }

  next(){
    
  }

}
