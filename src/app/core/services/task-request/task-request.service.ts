import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { OperationResult } from '../../models/system/operation-result';
import { OperationFileResult } from '../../models/system/opration-file-result';
import { StudentTask } from '../../models/task-request/request-task';
import { BaseService } from '../general/base.service';
import { AuthService } from '../system/auth.service';

const API = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class TaskRequestService extends BaseService<StudentTask> {

  constructor(authService: AuthService, http: HttpClient, title: Title,) {
    super(authService, http, "StudentTask", title)
  }

  getStudentTask(id){
    return this.http.get<StudentTask>(`${API}/StudentTask/FindByIdInclude?id=${id}`)
  }

  uploadFile(files: any, request: string){
    return this.http.post<OperationFileResult>(`${API}/File/UploadFile?requestType=${request}`, files);
  }
  removeFile(fileName:string){
    return this.http.get<OperationResult>(`${API}/File/RemoveFile?fileName=${fileName}`).toPromise();
  }

}
