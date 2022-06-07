import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserToken } from '../../models/dtos/user-token';
import { OperationResult } from '../../models/system/operation-result';
import { OperationFileResult } from '../../models/system/opration-file-result';
import { StudentTask,  TaskRequest } from '../../models/task-request/request-task';
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

  addTask(data: TaskRequest): Promise<OperationResult> {
    return this.http.post<OperationResult>(`${API}/StudentTask/AddUserTask`, data).toPromise();
  }

  getStudentTask(id): Observable<StudentTask> {
    return this.http.get<StudentTask>(`${API}/StudentTask/FindByIdInclude?id=${id}`)
  }

  uploadFile(files: any, request: string): Observable<OperationFileResult> {
    return this.http.post<OperationFileResult>(`${API}/File/UploadFile?requestType=${request}`, files);
  }
  removeFile(fileName: string): Promise<OperationResult> {
    return this.http.get<OperationResult>(`${API}/File/RemoveFile?fileName=${fileName}`).toPromise();
  }



  checkTaskOfUser(userId: number, taskId: number): Observable<OperationResult> {
    let user: UserToken = JSON.parse(localStorage.getItem("user"));
    let id = user.id

    return this.http.get<OperationResult>(`${API}/StudentTask/CheckTaskOfUser?userId=${userId}&taskId=${taskId}`);
  }

  updateNote(data: TaskRequest): Observable<OperationResult> {
    return this.http.put<OperationResult>(`${API}/StudentTask/UpdateNote`, data);
  }

  changeTaskForUser(data: TaskRequest): Observable<OperationResult> {
    return this.http.put<OperationResult>(`${API}/StudentTask/ChangeTaskForUser`, data);
  }

}


