import { User } from "../system/user";

export class NoteTask {
  id: number = 0;
  studentTaskId: number = 0;
  userNoteId: number = 0;
  createDate: string | null = null;
  note: string = "";
  userNote: User;

  constructor(taskId: number, userNoteId: number) {
    this.studentTaskId = taskId;
    this.userNoteId = userNoteId;

  }

}