import { RouterModule, Routes } from "@angular/router";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskRequestComponent } from "./task-request.component";
import { NgModule } from '@angular/core';
import { TaskDetailComponent } from "./task-detail/task-detail.component";
import { StudentTaskResolver } from "src/app/core/resolvers/request.resolver";
import { TaskAddComponent } from "./task-add/task-add.component";



const routes: Routes = [{
    path: '',
    component: TaskRequestComponent,
    children: [
        {
            path: 'list',
            component: TaskListComponent
        },
        {
            path: 'detail/:id',
            component: TaskDetailComponent,
            resolve: {
                task: StudentTaskResolver,       // <== key: value (service or Dependency injection token)
            }
        },
        {
            path:'add',
            component:TaskAddComponent
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TaskRequestRoutingModule { }