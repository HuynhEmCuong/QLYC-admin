import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentTaskReport } from '../models/task-request/request-task';
import { TaskRequestService } from '../services/task-request/task-request.service';

@Injectable({ providedIn: 'root' })
export class TaskReportResolver implements Resolve<StudentTaskReport> {

    constructor (private _serviceTask:TaskRequestService){}
    resolve(route: ActivatedRouteSnapshot): Observable<StudentTaskReport> | Promise<StudentTaskReport> | StudentTaskReport {
        return this._serviceTask.getReport();
    }
}