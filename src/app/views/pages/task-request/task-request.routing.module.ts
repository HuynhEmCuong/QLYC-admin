import { RouterModule, Routes } from "@angular/router";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskRequestComponent } from "./task-request.component";
import { NgModule } from '@angular/core';
import { TaskDetailComponent } from "./task-detail/task-detail.component";



const routes :Routes =[{
    path :'',
    component : TaskRequestComponent,
    children: [
        {
            path:'list',
            component:TaskListComponent
        },
        {
            path:'detail',
            component:TaskDetailComponent
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TaskRequestRoutingModule{}