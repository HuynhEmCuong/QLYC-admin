import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs/operators';
import { RequestStatus } from 'src/app/core/enums/requestStatus.enum';
import { StudentTask } from 'src/app/core/models/task-request/request-task';
import { AlertifyService } from 'src/app/core/services/general/alertify.service';
import { TaskRequestService } from 'src/app/core/services/task-request/task-request.service';

@Component({
  selector: 'app-task-handing',
  templateUrl: './task-handing.component.html',
  styleUrls: ['./task-handing.component.css']
})
export class TaskHandingComponent implements OnInit {
  @Input() studentTask: StudentTask;
  @Output() data = new EventEmitter<StudentTask>()
  fileNameOrgin: string;
  checkSave: boolean = true
  constructor(
    private readonly _alert: AlertifyService,
    private readonly _taskRequest: TaskRequestService,
    private readonly _sniper: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.checkSave = this.studentTask.taskRequest.fileName ? false : true;
  }

  onSelectFile(event: any) {
    this._sniper.show();
    if (event.target.files && event.target.files[0]) {
      this.checkSave = false;
      const file = event.target.files[0];
      if (file.size > 10485760) {
        this._alert.warning('Please select a file maximum size 10M!');
        return;
      }
      const formData = new FormData();
      let nameRequest = this.studentTask.taskRequest.id + "-" + this.studentTask.requestType.name.split(":")[1];
      formData.append('file', file);
      this._taskRequest
        .uploadFile(formData, nameRequest).pipe(
          tap(x => this._sniper.hide())
        )
        .subscribe(
          (res) => {
            if (res.success) {
              this.studentTask.taskRequest.filePath = res.fileResponse.fileFullPath;
              this.studentTask.taskRequest.fileName = res.fileResponse.fileLocalName;
              this.fileNameOrgin = res.fileResponse.fileOriginalName;
            }
          },
          (error) => {
            console.log(error);
            this._alert.warning("Lỗi hệ thống")
          }
        );
    }
  }

  removeFile() {
    this._alert.confirmInfo("Cảnh báo", "Bạn có muốn xoá file", async () => {
      this._sniper.show();
      let result = await this._taskRequest.removeFile(this.studentTask.taskRequest.fileName).then();
      if (result.success) {
        this._alert.success("Xoá file thành công");
        this.studentTask.taskRequest.fileName = "";
        this.studentTask.taskRequest.filePath = "";
        this.checkSave = true;
      } else {
        this._alert.warning("Lỗi hệ thống")
        
      }
      this._sniper.hide();
    })
  }

  updateFinish() {
    if (this.studentTask.taskRequest.fileName && this.studentTask.taskRequest.filePath) {
      this._sniper.show();
      this.studentTask.taskRequest.status = RequestStatus.complete;
      let data = this.studentTask.taskRequest;
      this._taskRequest.update(data).pipe().subscribe(res => {
        if (res.success) {
          this.studentTask.taskRequest = res.data;
          this._alert.success("Cập nhật thành  công ")
          this.emitData();
        } else {
          this._alert.error("Cập nhật không thành công ")
        }
        this._sniper.hide();
      }, error => {
        console.log(error);
        this._alert.error("Lỗi hệ thống")
        this._sniper.hide();
      }
      )
    } else {
      this._alert.error("File không được để trống")
      return
    }
  }
  emitData() {
    this.data.emit(this.studentTask)
  }
}
