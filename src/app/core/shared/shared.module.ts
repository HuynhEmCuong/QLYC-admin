import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { DxButtonModule, DxDataGridModule, DxPopupModule, DxCheckBoxModule, DxValidationGroupModule, DxFormModule, DxTextAreaModule, DxSelectBoxModule, DxTagBoxModule, DxBoxModule, DxLoadIndicatorModule, DxLoadPanelModule, DxListModule, DxHtmlEditorModule, DxScrollViewModule, DxSortableModule, DxValidationSummaryModule } from 'devextreme-angular';
import { Router } from '@angular/router';
import { LaddaModule } from 'angular2-ladda';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CompactFilePipe } from '../pipes/compact-file.pipe';
import { ImagePipe } from '../pipes/image.pipe';
import { RbacAllowDirective } from '../directives/rbac-allow.directive';
import { UploadMultipleComponent } from 'src/app/views/commons/upload-multiple/upload-multiple.component';
import { UploadCropComponent } from 'src/app/views/commons/upload-crop/upload-crop.component';
import { EditorFullComponent } from 'src/app/views/commons/editor-full/editor-full.component';
import { TimeagoClock, TimeagoCustomFormatter, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';
import { SafeHtmlPipe } from '../pipes/safeHTML.pipe';
import { RbacAllowArrDirective } from '../directives/rbac-allowArr.directive';
import { interval, Observable } from 'rxjs';
import { ContentLoaderModule } from '@ngneat/content-loader';
export class MyClock extends TimeagoClock {
  tick(then: number): Observable<number> {
    return interval(2000);
  }
}

@NgModule({
  declarations: [
    CompactFilePipe,
    ImagePipe,
    RbacAllowDirective,
    RbacAllowArrDirective,
    UploadMultipleComponent,
    EditorFullComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    DxButtonModule,
    DxDataGridModule,
    DxCheckBoxModule,
    DxValidationGroupModule,
    DxFormModule,
    DxLoadPanelModule,
    ModalModule.forRoot(),
    DxTextAreaModule,
    NgxDropzoneModule,
    DxHtmlEditorModule,
    DxValidationSummaryModule,
    //TimeagoModule.forRoot()
    TimeagoModule.forRoot({
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
      clock: {provide: TimeagoClock, useClass: MyClock},
    }),
    ContentLoaderModule
  ],
  exports: [
    DxButtonModule,
    DxDataGridModule,
    DxPopupModule,
    DxBoxModule,
    DxLoadIndicatorModule,
    DxCheckBoxModule,
    DxTagBoxModule,
    DxValidationGroupModule,
    DxTextAreaModule,
    DxSelectBoxModule,
    DxFormModule,
    DxLoadPanelModule,
    LaddaModule,
    ModalModule,
    NgxDropzoneModule,
    CompactFilePipe,
    ImagePipe,
    DxListModule,
    DxHtmlEditorModule,
    RbacAllowDirective,
    RbacAllowArrDirective,
    UploadMultipleComponent,
    EditorFullComponent,
    TimeagoModule,
    SafeHtmlPipe,
    DxScrollViewModule,
    DxSortableModule,
    ContentLoaderModule,
    DxValidationSummaryModule
  ],
  providers: [TimeagoIntl
  ]
})
export class SharedModule{}
