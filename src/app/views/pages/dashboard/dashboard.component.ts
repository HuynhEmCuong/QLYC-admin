import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/general/alertify.service';
import * as Highcharts from 'highcharts';
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
  
  // Chart 
  highcharts = Highcharts;

  chartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Báo cáo công việc theo cá nhân',
    },
    legend: {},
    xAxis: {
      categories: [
        'Thao Lan',
        'Quynh Dao',
        'Trang Pham',
        'Thien Trang',
        'Khang Nguyen',
      ],
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Số lượng công việc ',
        align: 'high',
      },
      labels: {
        overflow: 'justify',
      },
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      valueSuffix:' Yêu cầu',
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
        },
      },
      series: {
        stacking: 'normal',
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        color: '#25e70c',
        name: 'Hoàn thành',
        data: [1, 2, 2, 6],
      },
      {
        color: '#ffc107',
        name: 'Đang xử lý',
        data: [5, 6, 3, 4],
      },
      {
        color: '#e70c0c',
        name: 'Trể hạn',
        data: [2, 0, 4, 6],
      },
    ],
  };
}
