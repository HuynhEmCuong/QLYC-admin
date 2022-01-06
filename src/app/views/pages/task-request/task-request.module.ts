import { NgModule } from "@angular/core";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskRequestComponent } from "./task-request.component";
import { TaskRequestRoutingModule } from "./task-request.routing.module";

@NgModule({
    imports: [TaskRequestRoutingModule],
    declarations: [
        TaskListComponent,
        TaskRequestComponent
    ]
})
export class TaskRequestModule { }