import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../../models/student/student';


const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private _http: HttpClient) { }

  getStudent(studentId: string): Observable<Student> {
    return this._http.get<Student>(`${API_URL}/Student/GetStudentByStudentId?mssv=${studentId}`);
  }

}

