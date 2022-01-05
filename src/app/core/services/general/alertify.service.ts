import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import swal from "sweetalert2";

declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor(
    private router: Router
    ) {
    alertify.set('notifier', 'position', 'top-right');
  }

  success(message: string) {
    alertify.success(message, {});
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  confirmDeleteFile(callBack) {
    swal.fire({
      title: 'Bạn chắc chắn muốn xóa?',
      text: "Điều này đồng nghĩa với file bị xóa khỏi hệ thống phần mềm và không thể khôi phục lại!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý xóa!',
      cancelButtonText:'Đóng'
    }).then((result) => {
      if (result.value) {
        callBack();
      }
    })
  }

  confirmDeleteRowGrid(callBack) {
    swal.fire({
      title: 'Bạn chắc chắn muốn xóa?',
      text: "Dữ liệu sẽ không thể khôi phục lại!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý xóa!',
      cancelButtonText:'Đóng'
    }).then((result) => {
      if (result.value) {
        callBack();
      }
    })
  }

  confirm(title:string, text:string, callBack) {
    swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý!',
      cancelButtonText:'Đóng'
    }).then((result) => {
      if (result.value) {
        callBack();
      }
    })
  }

  confirmInfo(title:string, text:string, callBack) {
    swal.fire({
      title: title,
      text: text,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý!',
      cancelButtonText:'Đóng'
    }).then((result) => {
      if (result.value) {
        callBack();
      }
    })
  }

  confirmDeleteSuccess() {
    swal.fire(
      'Xóa thành công!',
      'Dữ liệu của bạn đã bị xóa khỏi hệ thống.',
      'success'
    )
  }

  permissionNotifi(message) {
    swal.fire({
      icon: 'error',
      title: 'Permission !',
      text: message,
      footer: 'Vui lòng liên hệ với Administrator để được hỗ trợ!'
    })
  }

  confirmWarning(title, callBack) {
    swal.fire({
      title: title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if(result.isConfirmed){
        callBack();
      }
    })
  }


  showMessage(type, title: string, message: string) {
    swal.fire({
      icon: type,
      title: title,
      text: message,
      confirmButtonText: 'Ok'
    })
  }

  permissionRediact(url) {
    swal.fire(
      {
        icon: 'error',
        title: 'Permission !',
        text: 'Không có quyền',
        footer: 'Vui lòng liên hệ với Administrator để được hỗ trợ!'
      }
    ).then(() => {
      let urlMain = url.split("/").slice(0, 3).join("/");
      this.router.navigate([urlMain]);
    });
  }

}
