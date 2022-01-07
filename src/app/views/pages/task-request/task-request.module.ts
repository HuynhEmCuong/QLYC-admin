import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/core/shared/shared.module";
import { TaskDetailComponent } from "./task-detail/task-detail.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskRequestComponent } from "./task-request.component";
import { TaskRequestRoutingModule } from "./task-request.routing.module";
import { TabsModule } from 'ngx-bootstrap/tabs';
@NgModule({
    imports: [
        CommonModule,
        TaskRequestRoutingModule,
        HttpClientModule,
        SharedModule,
        TabsModule.forRoot()
    ],
    declarations: [
        TaskListComponent,
        TaskRequestComponent,
        TaskDetailComponent
    ]
})
export class TaskRequestModule { }