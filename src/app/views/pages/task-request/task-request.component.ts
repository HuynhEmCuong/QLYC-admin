import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-task-request',
    template: '<router-outlet></router-outlet><ngx-spinner bdColor = "rgba(23,65,104,0.29)" size = "medium" color = "#174168" type = "line-spin-fade-rotating" [fullScreen] = "true"><p style="color: #d5caba;font-size: 18px;" > Loading... </p></ngx-spinner>',
})

export class TaskRequestComponent implements OnInit{
    constructor(){}
    ngOnInit(): void {
        
    }
    
}