import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { FunctionResolver } from './core/resolvers/function.resolver';
import { LayoutComponent } from './theme/layout/layout.component';
import { LockScreenComponent } from './views/auth/lock-screen/lock-screen.component';
import { LoginComponent } from './views/auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
  {
    path: '',
    component:LayoutComponent,
    resolve: { funcions: FunctionResolver },
    children:[
      {
        path:'pages',
        loadChildren: () => import('./views/pages/pages.module')
        .then(m => m.PagesModule),
      }
    ]
  },
  {
    path: 'auth/login',
    component:LoginComponent,
  },
  {
    path: 'auth/lock',
    component:LockScreenComponent,
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false
};

@NgModule({
  imports: [RouterModule.forRoot(
    routes, config
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
