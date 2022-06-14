import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/core/shared/shared.module";
import { ReportRoutingModule } from "./report-routing.module";
import { ReportUserComponent } from "./report-user/report-user.component";
import { ReportComponent } from "./report.component";

@NgModule({

    imports:[
        CommonModule,
        SharedModule,
        ReportRoutingModule
    ],
    declarations:[
        ReportComponent,
        ReportUserComponent
    ],
    exports:[]
})


export class ReportModule {

}