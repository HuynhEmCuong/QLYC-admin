import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { StudentTaskReport } from '../../models/reports/report-task';


const API = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private readonly http: HttpClient) { }

  getReport(): Observable<StudentTaskReport> {
    return this.http.get<StudentTaskReport>(`${API}/Report/ReportTask`)
  }


}
