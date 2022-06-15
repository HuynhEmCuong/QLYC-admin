import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/general/alertify.service';

import { StudentTaskReport } from 'src/app/core/models/reports/report-task';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reportTask: StudentTaskReport;
  constructor(private _routeActive: ActivatedRoute , private _alertService:AlertifyService) {
    this._routeActive.data.subscribe(res => {
      this.reportTask = res.report;
      this._alertService.showMessage("warning","Thông báo",`Hôm nay có ${this.reportTask.receivedInDay} yêu cầu`);
    })
  }

  ngOnInit() {

  }
  
  
}
