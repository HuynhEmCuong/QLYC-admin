import { RouterModule, Routes } from "@angular/router";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskRequestComponent } from "./task-request.component";
import { NgModule } from '@angular/core';



const routes :Routes =[{
    path :'',
    component : TaskRequestComponent,
    children: [
        {
            path:'list',
            component:TaskListComponent
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TaskRequestRoutingModule{}