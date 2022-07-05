import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { dateConvertToStringNoTimeZone } from 'src/app/core/common/helper';
import { ReportUserChart } from 'src/app/core/models/reports/report-user';
import { ReportService } from 'src/app/core/services/reports/report.service';

@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrls: ['./report-user.component.css']
})
export class ReportUserComponent implements OnInit {
  highcharts: any = Highcharts;
  chartOptions: any =null;
  result: ReportUserChart = new ReportUserChart();
  startDate :Date;
  endDate:Date;
  dataSource:any;
  

  constructor(private readonly _reportService: ReportService) { }


  ngOnInit() {
    // this.getData();
    this.chartData();
  }


  getData() {
    this._reportService.getReportUser().subscribe(res => {
      this.dataSource = res
    })

  }

  filter(){
    const startDate = dateConvertToStringNoTimeZone(this.startDate);
    const endDate = dateConvertToStringNoTimeZone(this.endDate);

    const parms = {
      startDate :startDate,
      endDate :endDate

    }

    this._reportService.getReportUser(parms).subscribe(res => {
      this.dataSource = res
    })
  }


  chartData() {

    this.chartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Báo cáo công việc theo cá nhân',
      },
      legend: {},
      xAxis: {
        categories: this.result.name,
        title: {
          text: null,
        },
      },
      // yAxis: {
      //   min: 0,
      //   title: {
      //     text: 'Số lượng công việc ',
      //     align: 'high',
      //   },
      //   labels: {
      //     overflow: 'justify',
      //   },
      // },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        valueSuffix: ' Yêu cầu',
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
          color: '#3BE757',
          name: 'Hoàn thành',
          data: this.result.total_success,
        },
       
        {
          color: '#EA260F',
          name: 'Trể hạn',
          data: this.result.total_late,
        },
        // {
        //   color: '#34AFF5',
        //   name: 'Tổng ',
        //   data: this.result.total,
        // },
      ],
    };
  }
  // Chart 


}
