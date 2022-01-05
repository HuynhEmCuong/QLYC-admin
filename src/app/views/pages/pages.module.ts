import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { HttpClientModule } from '@angular/common/http';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { DxListModule } from 'devextreme-angular';
import { UploadMultipleComponent } from '../commons/upload-multiple/upload-multiple.component';
import { HighchartsChartComponent } from 'highcharts-angular/lib/highcharts-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    HttpClientModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxListModule,
    HighchartsChartModule
  ],
  declarations: [PagesComponent,DashboardComponent]
})
export class PagesModule { }
