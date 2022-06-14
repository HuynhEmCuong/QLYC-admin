import { Component, OnInit } from "@angular/core";


@Component({
    selector: 'app-report',
    template: `<router-outlet></router-outlet>`
  })

export class ReportComponent  implements OnInit{
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

}