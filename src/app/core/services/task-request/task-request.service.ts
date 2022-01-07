import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
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

}
