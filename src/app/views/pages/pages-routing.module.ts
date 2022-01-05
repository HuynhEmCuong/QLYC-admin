import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AuthorizationGuard } from 'src/app/core/guards/authorization.guard';
const routes: Routes = [{
    path: '',
    component: PagesComponent,
    runGuardsAndResolvers:'always',
    canActivate: [AuthGuard,AuthorizationGuard],
    children: [
        {
            path: 'dashboard',
            component: DashboardComponent
        },
        {
            path: 'manager',
            loadChildren: () => import('./system/system.module')
            .then(m => m.SystemModule)
        },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: '**', redirectTo: 'dashboard' },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class PagesRoutingModule {
}
