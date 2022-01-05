import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OperationResult } from '../../models/system/operation-result';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

constructor(private alertService:AlertifyService) { }

  async action(entity,apiService,callBack){
    let response:OperationResult;
    if(entity.Id!=null && entity.Id > 0 ){
       response = await apiService.update(entity).toPromise().then();
      if(response.Success)
        this.alertService.success(response.Message);
      else
        this.alertService.error(response.Message);
    }
    else{
       response = await apiService.add(entity).toPromise().then();
      if(response.Success)
        this.alertService.success(response.Message);
      else
        this.alertService.error(response.Message);
    }
    callBack(response);
  }


  async deleteRowGrid(id,apiService,callBack){
    let response:OperationResult;
    if(id>0){
      this.alertService.confirmDeleteRowGrid(async ()=>{
        response = await apiService.remove(id).toPromise().then();
        if(response.Success)
          this.alertService.success("Xóa thành công");
        else
        {
          if(response.Message.includes("The DELETE statement conflicted with the REFERENCE"))
            this.alertService.error("Không thể xóa ! Danh mục này đã phát sinh trong hệ thống, Vui lòng xóa các danh mục liên quan trước khi xóa danh mục này!");
          else{
              this.alertService.error("Xóa thất bại !" +response.Message);
          }
        }

        callBack(response);
      })
    }
  }

  validateExistGrid(element,data,fieldId,fields){
    let result = data.filter(x=>x[fieldId] != element.data[fieldId]);
    fields.forEach(field => {
        result =result.filter(x=>x[field] == element.data[field]);
    })
    if(result.length>0)
        return false;
    return true;
  }

  validateDxForm(validation,callback){
    if(validation.status === "pending"){
      validation.complete.then((r) => {
        if (r.isValid) {
         callback(r.isValid);
        }
      })
    }
    else{
      callback(validation.isValid);
    }
  }

  downloadBlob(data, fileName, mimeType) {
    var blob, url;
    blob = new Blob([data], {
      type: mimeType
    });
    url = window.URL.createObjectURL(blob);
    var a;
    a = document.createElement('a');
    a.href = url
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
    setTimeout(function () {
      return window.URL.revokeObjectURL(url);
    }, 1000);
  };

}
