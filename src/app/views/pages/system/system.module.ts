import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UploadCropComponent } from 'src/app/views/commons/upload-crop/upload-crop.component';
import { GridDetailComponent } from './manager-account/role/permission/grid-detail/grid-detail.component';
import { PermissionComponent } from './manager-account/role/permission/permission.component';
import { RoleActionComponent } from './manager-account/role/role-action/role-action.component';
import { RoleListComponent } from './manager-account/role/role-list/role-list.component';
import { UserProfileComponent } from './manager-account/user-profile/user-profile.component';
import { UserActionComponent } from './manager-account/user/user-action/user-action.component';
import { UserListComponent } from './manager-account/user/user-list/user-list.component';
import { OptionParametersActionComponent } from './option-parameters/option-parameters-action/option-parameters-action.component';
import { OptionParametersListComponent } from './option-parameters/option-parameters-list/option-parameters-list.component';
import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
@NgModule({
  imports: [
    CommonModule,
    SystemRoutingModule,
    FormsModule,
    SharedModule,
    PaginationModule.forRoot()
  ],
  declarations: [
    UploadCropComponent,
    SystemComponent,
    UserListComponent,
    UserActionComponent,
    RoleListComponent,
    RoleActionComponent,
    OptionParametersListComponent,
    OptionParametersActionComponent,
    UserProfileComponent,
    PermissionComponent,
    GridDetailComponent,
  ]
})
export class SystemModule { }
