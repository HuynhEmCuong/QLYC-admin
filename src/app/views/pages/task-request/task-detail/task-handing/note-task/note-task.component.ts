import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NoteTask } from 'src/app/core/models/noteTask/noteTask';
import { StudentTask } from 'src/app/core/models/task-request/request-task';
import { AlertifyService } from 'src/app/core/services/general/alertify.service';
import { NoteTaskService } from 'src/app/core/services/task-request/note-task.service';
import { DataNoteTask } from '../task-handing.component';

@Component({
  selector: 'app-note-task',
  templateUrl: './note-task.component.html',
  styleUrls: ['./note-task.component.css'],
})
export class NoteTaskComponent implements OnInit, OnChanges {
  @Input() studentTask: StudentTask;
  noteTask: NoteTask = new NoteTask();
  constructor(
    private readonly _noteTaskSv: NoteTaskService,
    private readonly _alert: AlertifyService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshData();
  }

  ngOnInit(): void { }

  async addNoteTask() {
    if (this.noteTask.note) {
      const userNote = this.studentTask.appUser;
      this.noteTask.userNoteId = userNote.id;
      this.noteTask.studentTaskId = this.studentTask.taskRequest.id;
      const result = await this._noteTaskSv.addTask(this.noteTask).then();
      if (result.success) {
        this._alert.success('Thêm thành công');
        result.data.userNote = userNote;
        this.studentTask.taskRequest.noteTasks.unshift(result.data);
        this.refreshData();
        return;
      }
    } else {
      this._alert.warning('Ghi chú không được để trống');
      return;
    }
  }

  private refreshData() {
    this.noteTask = new NoteTask();
    this.noteTask.studentTaskId = this.studentTask.taskRequest.id;
    this.noteTask.userNoteId = this.studentTask.appUser
      ? this.studentTask.appUser.id
      : 0;
  }
}
