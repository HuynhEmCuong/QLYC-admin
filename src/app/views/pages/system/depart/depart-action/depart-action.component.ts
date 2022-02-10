import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Department } from 'src/app/core/models/depart/depart';
import { DepartService } from 'src/app/core/services/depart/depart.service';
import { ShareService } from 'src/app/core/services/general/share.service';

@Component({
  selector: 'app-depart-action',
  templateUrl: './depart-action.component.html',
  styleUrls: ['./depart-action.component.css']
})
export class DepartActionComponent implements OnInit {
  @ViewChild("childModal", { static: false }) childModal: ModalDirective;
  @ViewChild("targetForm", { static: true }) targetForm: DxFormComponent;
  @Output() loadInit = new EventEmitter<void>();
  entity: Department = new Department();
  isLoading: boolean = false;
  dataSourceStatus = [{
    id: 1,
    name: "Hoạt động"
  },
  {
    id: 0,
    name: 'Không hoạt động'
  }]
  constructor(private shareService: ShareService,
    private readonly dept: DepartService) {
  }

  ngOnInit() {
    this.entity.status = 1;
  }

  fnSave() {
    let validation: any = this.targetForm.instance.validate();
    this.shareService.validateDxForm(validation, (isValid) => {
      if (isValid) {
        this.shareService.action(this.entity, this.dept, (res) => {
          if (res.success) {
            this.childModal.hide();
            this.loadInit.emit();
          }
        })
      }
    })
  }

  async showModal(item: Department) {
    if (item) {
      this.entity = await this.dept.findById(item.id).toPromise().then();
    } else {
      this.targetForm.instance.resetValues();
      this.entity.status = 1;
    }
    this.childModal.show()
  }

  hideModal = () => this.childModal.hide()
}
