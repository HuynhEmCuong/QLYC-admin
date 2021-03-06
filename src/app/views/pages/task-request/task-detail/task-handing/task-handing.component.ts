import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs/operators';
import { RequestStatus } from 'src/app/core/enums/requestStatus.enum';
import { NoteTask } from 'src/app/core/models/noteTask/noteTask';
import { User } from 'src/app/core/models/system/user';
import { StudentTask, TaskRequest } from 'src/app/core/models/task-request/request-task';
import { AlertifyService } from 'src/app/core/services/general/alertify.service';
import { TaskRequestService } from 'src/app/core/services/task-request/task-request.service';
import { environment } from 'src/environments/environment';


const API = environment.apiUrl
@Component({
  selector: 'app-task-handing',
  templateUrl: './task-handing.component.html',
  styleUrls: ['./task-handing.component.css']
})
export class TaskHandingComponent implements OnInit {
  @Input() studentTask: StudentTask;
  @Output() data = new EventEmitter<StudentTask>();
  @Input() users: User[];
  fileNameOrgin: string;
  checkSave: boolean = true
  linkFileAPI: string = API + "/";

  userReciveTask: number = 1;
  constructor(
    private readonly _alert: AlertifyService,
    private readonly _taskRequest: TaskRequestService,
    private readonly _sniper: NgxSpinnerService,
  ) { }


  ngOnInit() {
    this.checkSave = this.studentTask.taskRequest.fileName ? false : true;

  }

  cancelTask(): void {
    this._alert.confirmInfo("Huỷ Yêu Cầu", "Bạn có muốn huỷ yêu cầu này", () => {
      this._sniper.show();
      this.studentTask.taskRequest.status = RequestStatus.disbaled;
      this._taskRequest.update(this.studentTask.taskRequest).subscribe(res => {
        if (res.success) {
          this._alert.success("Thay đổi trạng thái thành công");
          this.studentTask.taskRequest = res.data;
          this.emitData();
        } else {
          this._alert.error("Lỗi hệ thống")
        }
        this._sniper.hide();
      })
    })
  }

  onSelectFile(event: any) {
    this._sniper.show();
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 10485760) {
        this._alert.warning('Please select a file maximum size 10M!');
        this._sniper.hide();
        return;
      }
      const formData = new FormData();
      let nameRequest = this.studentTask.requestType.name.split(":");
      let nameFile = this.studentTask.taskRequest.id + "-" + (nameRequest[1] ? nameRequest[1] : nameRequest[0]);
      formData.append('file', file);
      this._taskRequest
        .uploadFile(formData, nameFile).pipe(
          tap(x => this._sniper.hide())
        )
        .subscribe(
          (res) => {
            if (res.success) {
              this.checkSave = false;
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

  removeFile(): void {
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

  updateFinish(): void {
    this._sniper.show();
    this.studentTask.taskRequest.status = RequestStatus.complete;
    let data = this.studentTask.taskRequest;
    this._taskRequest.update(data).pipe()
      .subscribe(res => {
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
      })
  }

  emitData(): void {
    this.data.emit(this.studentTask)
  }

  changeTask() {
    this._alert.confirm("Cảnh báo", "Bạn có muốn thay đổi người xử lý công việc", () => {
      if (this.userReciveTask == +this.studentTask.appUser.id) {
        this._alert.error(`Chuyên viên ${this.studentTask.appUser.name} đang xử lý công việc này`);
        return;
      } else {
        this._sniper.show();
        this.studentTask.taskRequest.receiverId = this.userReciveTask;
        this.studentTask.taskRequest.requestType = this.studentTask.requestType;
        this._taskRequest.changeTaskForUser(this.studentTask.taskRequest).subscribe(res => {
          if(res.success){
            this._sniper.hide();
            this._alert.success("Cập nhật thành công");
            this.studentTask.appUser = res.data.appUser;
            this.studentTask.taskRequest = new TaskRequest().mapData( res.data);
            return
          }else {
            this._sniper.hide();
            this._alert.error("Lỗi hệ thống");
            return;
          }
          
        })
      }
    })
  }


}


