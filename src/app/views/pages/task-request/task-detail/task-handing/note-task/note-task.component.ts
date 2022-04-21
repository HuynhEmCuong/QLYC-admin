import { Component, Input, OnInit } from '@angular/core';
import { NoteTask } from 'src/app/core/models/noteTask/noteTask';
import { DataNoteTask } from '../task-handing.component';

@Component({
  selector: 'app-note-task',
  templateUrl: './note-task.component.html',
  styleUrls: ['./note-task.component.css']
})
export class NoteTaskComponent implements OnInit {
  @Input() dataNoteTasks: DataNoteTask;
  noteTask :NoteTask = new NoteTask();
  constructor() { }

  ngOnInit() {
  }

  addNoteTask(){
    console.log(this.noteTask);
  }

}
