import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StudentTaskReport } from '../../models/reports/report-task';
import { ReportUser, ReportUserChart } from '../../models/reports/report-user';


const API = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private readonly http: HttpClient) { }

  getReport(): Observable<StudentTaskReport> {
    return this.http.get<StudentTaskReport>(`${API}/Report/ReportTask`)
  }

  getReportUser(): Observable<ReportUserChart> {
    return this.http.get<ReportUser[]>(`${API}/Report/GetReportUsers`).pipe(
      map(
        (res: ReportUser[]) => {
          let result: ReportUserChart = new ReportUserChart();
          res.map(
            (item) => {
              result.name.push(item.userName);
              result.total_late.push(item.totalLate);
              // result.total_process.push(item.totalProceesing);
              result.total_success.push(item.totalSuccess);
              result.total.push(item.total);
            }
          )
          return result;
        }
      )
    )
  }

}
