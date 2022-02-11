import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs/operators';
import { RequestStatus } from 'src/app/core/enums/requestStatus.enum';
import { StudentTask } from 'src/app/core/models/task-request/request-task';
import { AlertifyService } from 'src/app/core/services/general/alertify.service';
import { TaskRequestService } from 'src/app/core/services/task-request/task-request.service';

@Component({
  selector: 'app-task-complete',
  templateUrl: './task-complete.component.html',
  styleUrls: ['./task-complete.component.css']
})
export class TaskCompleteComponent implements OnInit {
  @Input() studentTask: StudentTask;
  constructor(private readonly _alert: AlertifyService,
    private readonly _takRequestService: TaskRequestService,
    private readonly _sniper: NgxSpinnerService) { }

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

  cancelTask() {
    this._alert.confirmInfo("Cảnh báo", "Bạn có muốn huỷ yêu cầu này", () => {
      this._sniper.show();
      // let data = this.taskRequest;
      // delete data.appUser;
      // data.status =RequestStatus.disbaled
      // this._takRequestService.update(data).pipe(tap(() => this._sniper.hide())).subscribe(res => {
      //   if (res.success) {
      //     this._alert.success("Thay đổi trạng thái thành công");
      //     this.taskRequest = res.data;

      //   } else {
      //     this._alert.error("Lỗi hệ thống")
      //   }
      // });


    })
  }
}
