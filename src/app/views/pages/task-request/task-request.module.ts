import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/core/shared/shared.module";
import { TaskDetailComponent } from "./task-detail/task-detail.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskRequestComponent } from "./task-request.component";
import { TaskRequestRoutingModule } from "./task-request.routing.module";
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TaskReceiveComponent } from "./task-detail/task-receive/task-receive.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TaskHandingComponent } from "./task-detail/task-handing/task-handing.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { TaskCompleteComponent } from "./task-detail/task-complete/task-complete.component";
import { TaskAddComponent } from "./task-add/task-add.component";
import { NoteTaskComponent } from "./task-detail/task-handing/note-task/note-task.component";
@NgModule({
    imports: [
        CommonModule,
        TaskRequestRoutingModule,
        HttpClientModule,
        FormsModule,    
        SharedModule,
        TabsModule.forRoot(),
        NgxSpinnerModule,
        ReactiveFormsModule,

    ],
    declarations: [
        TaskListComponent,
        TaskRequestComponent,
        TaskDetailComponent,
        NoteTaskComponent,
        TaskReceiveComponent,
        TaskHandingComponent,
        TaskCompleteComponent,
        TaskAddComponent
    ]
})
export class TaskRequestModule { }