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

  formatNameFile(fileName: string) {
    if (fileName) {
      let fileExtension = fileName.split('.').pop();
      if (fileName.length > 20) {
        fileName = fileName.slice(0, 20) + '....' + fileExtension;
      }
    }
    return fileName;
  }

  cancelTask(){
    
  }
}
