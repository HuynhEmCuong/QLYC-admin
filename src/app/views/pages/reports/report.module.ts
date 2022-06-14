import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/core/shared/shared.module";
import { ReportRoutingModule } from "./report-routing.module";
import { ReportComponent } from "./report.component";

@NgModule({

    imports:[
        CommonModule,
        SharedModule,
        ReportRoutingModule
    ],
    declarations:[
        ReportComponent
    ],
    exports:[]
})


export class ReportModule {

}