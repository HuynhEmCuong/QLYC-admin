import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueStatus } from 'src/app/core/enums/issue.enum';
import { StudentTaskReport } from 'src/app/core/models/task-request/request-task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reportTask: StudentTaskReport;
  constructor(private _routeActive: ActivatedRoute) {
    this._routeActive.data.subscribe(res => {
      this.reportTask = res.report;
    })
  }

  ngOnInit() {

  }

}
