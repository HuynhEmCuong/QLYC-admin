import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { RequestType } from 'src/app/core/models/task-request/request-type';
import { ShareService } from 'src/app/core/services/general/share.service';
import { RequestTypeService } from 'src/app/core/services/request-type/request-type.service';

@Component({
  selector: 'app-request-type-action',
  templateUrl: './request-type-action.component.html',
  styleUrls: ['./request-type-action.component.css']
})
export class RequestTypeActionComponent implements OnInit {
  @ViewChild("childModal", { static: false }) childModal: ModalDirective;
  @ViewChild("targetForm", { static: true }) targetForm: DxFormComponent;
  @Output() loadInit = new EventEmitter<void>();
  entity: RequestType = new RequestType();
  isLoading: boolean = false;
  dataSourceStatus = [{
    id: 1,
    name: "Hoạt động"
  },
  {
    id: 0,
    name: 'Không hoạt động'
  }]
  constructor(private readonly shareService: ShareService,
    private readonly  _requestType: RequestTypeService) { }

  ngOnInit() {
  }

  fnSave() {
    let validation: any = this.targetForm.instance.validate();
    this.shareService.validateDxForm(validation, (isValid) => {
      if (isValid) {
        this.shareService.action(this.entity, this._requestType, (res) => {
          if (res.success) {
            this.childModal.hide();
            this.loadInit.emit();
          }
        })
      }
    })
  }

  async showModal(item: RequestType) {
    if (item) {
      this.entity = await this._requestType.findById(item.id).toPromise().then();
    } else {
      this.targetForm.instance.resetValues();
      this.entity.status = 1;
    }
    this.childModal.show()
  }

  hideModal = () => this.childModal.hide()

}
