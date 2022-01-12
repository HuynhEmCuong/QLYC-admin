import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskstatus'
})
export class TaskStatusPipe implements PipeTransform {

  transform(value: any): any {
    let result = '';
    switch (value) {
      case 1:
        result = 'Đã gửi';
        break;
      case 2:
        result = 'Đang xử lý';
        break;
     case 3:
        result = 'Hoàn thành';
        break;
      default:
        result ="Đã huỷ";
        break;
    }
    return result;
  }

}