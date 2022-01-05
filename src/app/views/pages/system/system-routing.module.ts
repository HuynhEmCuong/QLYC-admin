import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserListComponent } from './manager-account/user/user-list/user-list.component';
import { RoleListComponent } from './manager-account/role/role-list/role-list.component';
import { UserProfileComponent } from './manager-account/user-profile/user-profile.component';
import { PermissionComponent } from './manager-account/role/permission/permission.component';
import { OptionParametersListComponent } from './option-parameters/option-parameters-list/option-parameters-list.component';
import { SystemComponent } from './system.component';
const routes: Routes = [{
    path: '',
    component: SystemComponent,
    children: [
        {
            path: 'users',
            component: UserListComponent
        },
        {
            path: 'roles',
            component: RoleListComponent
        },
        {
          path: 'profile',
          component: UserProfileComponent
        },
        {
            path: 'option-parameters',
            component: OptionParametersListComponent
        },
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: '**', redirectTo: 'list' },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class SystemRoutingModule {
}
