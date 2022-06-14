import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportUserComponent } from "./report-user/report-user.component";


const routes :Routes = [
    {
        path:"user",
        component:ReportUserComponent
    },
   
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ReportRoutingModule {}