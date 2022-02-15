import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/system/auth.service';

@Directive({
  selector: '[checkPermission]'
})
export class CheckPermissionDirective implements OnInit {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService

  ) { }
  ngOnInit(): void {
    debugger
    this.viewContainer.clear();
    if (this.auth.checkRole()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    else
      this.viewContainer.clear();
  }

}
