import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentTask } from '../models/task-request/request-task';
import { TaskRequestService } from '../services/task-request/task-request.service';

@Injectable({ providedIn: 'root' })
export class StudentTaskResolver implements Resolve<StudentTask> {
    constructor(private _studetTask:TaskRequestService) {

    }
    resolve(route: ActivatedRouteSnapshot): Observable<StudentTask> | Promise<StudentTask> | StudentTask {
        const id = route.paramMap.get('id')
        return this._studetTask.getStudentTask(id);
    }
}