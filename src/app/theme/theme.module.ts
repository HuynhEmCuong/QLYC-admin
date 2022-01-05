import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { ModalTimeoutComponent } from './components/modal-timeout/modal-timeout.component';
import { ImagePipe } from '../core/pipes/image.pipe';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [

  ]
})
export class ThemeModule { }
