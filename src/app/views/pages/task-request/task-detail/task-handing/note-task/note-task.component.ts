import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NoteTask } from 'src/app/core/models/noteTask/noteTask';
import { AlertifyService } from 'src/app/core/services/general/alertify.service';
import { NoteTaskService } from 'src/app/core/services/task-request/note-task.service';
import { DataNoteTask } from '../task-handing.component';

@Component({
  selector: 'app-note-task',
  templateUrl: './note-task.component.html',
  styleUrls: ['./note-task.component.css']
})
export class NoteTaskComponent implements OnInit, OnChanges {
  @Input() dataNoteTasks: DataNoteTask;
  noteTask: NoteTask;
  constructor(
    private readonly _noteTaskSv: NoteTaskService,
    private readonly _alert: AlertifyService) { }
    
  ngOnChanges(changes: SimpleChanges): void {
    this.noteTask = new NoteTask(this.dataNoteTasks.studentTaskId, this.dataNoteTasks.user.id);
  }

  ngOnInit(): void {

  }

  async addNoteTask() {
    if (this.noteTask.note) {
      const userNote = this.dataNoteTasks.user;

      this.noteTask.userNoteId = userNote.id;
      this.noteTask.studentTaskId = this.dataNoteTasks.studentTaskId;
      const result = await this._noteTaskSv.addTask(this.noteTask).then();
      if (result.success) {
        this._alert.success("Thêm thành công");
        result.data.userNote = userNote;
        this.dataNoteTasks.noteTasks.unshift(result.data);
        this.noteTask = new NoteTask(this.dataNoteTasks.studentTaskId, this.dataNoteTasks.user.id);
        return;
      }
    } else {
      this._alert.warning("Ghi chú không được để trống");
      return;
    }
  }

}
