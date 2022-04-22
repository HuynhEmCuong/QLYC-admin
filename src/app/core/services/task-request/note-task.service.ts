import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NoteTask } from '../../models/noteTask/noteTask';
import { OperationResult } from '../../models/system/operation-result';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NoteTaskService {

  constructor(private readonly _http: HttpClient) {

  }


  addTask(data: NoteTask): Promise<OperationResult> {
    return this._http.post<OperationResult>(`${API}/NoteTask/Add`, data).toPromise();
  }

}
