import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Student } from 'src/app/core/models/student/student';
import { StudentTask, TaskRequest } from 'src/app/core/models/task-request/request-task';
import { RequestType } from 'src/app/core/models/task-request/request-type';
import { AlertifyService } from 'src/app/core/services/general/alertify.service';
import { RequestTypeService } from 'src/app/core/services/request-type/request-type.service';
import { StudentService } from 'src/app/core/services/student/student.service';
import { TaskRequestService } from 'src/app/core/services/task-request/task-request.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {
  keyword: FormControl = new FormControl();
  studentTask: TaskRequest = new TaskRequest();
  requestTypes: RequestType[];
  studentInfo: Student = new Student();
  constructor(
    private readonly _requestTypeService: RequestTypeService,
    private readonly _studentService: StudentService,
    private readonly _alertService: AlertifyService,
    private readonly _taskRequestService: TaskRequestService
  ) { }

  ngOnInit() {
    this.getAllRequestType();
    this.searchStudent();
  }

  getAllRequestType(): void {
    this._requestTypeService.getAll().subscribe(res => {
      this.requestTypes = res;
    })
  }

  searchStudent(): void {
    this.keyword.valueChanges
      .pipe(
        debounceTime(1500),
      )
      .subscribe((val) => {
        this._studentService.getStudent(val).subscribe(res => {
          if (res) {
            this.studentInfo = res;
          } else {
            this._alertService.warning("Không tìm thấy sinh viên");
            this.studentInfo = new Student();
            return;
          }
        })
      });
  }

  async save() {
    if (this.studentTask.requestId) {
      this.studentTask.studentId = this.studentInfo.id;
      const result = await this._taskRequestService.addTask(this.studentTask);
      if (result.success) {
        this._alertService.success("Thêm thành công");
        this.studentInfo = new Student();
        this.studentTask = new TaskRequest();
        return;
      } else {
        this._alertService.error("Lỗi hệ thống");
        return;
      }

    } else {
      this._alertService.error("Chọn loại yêu cầu");
      return
    }
  }
}

