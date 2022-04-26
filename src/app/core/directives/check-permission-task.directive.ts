import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/system/auth.service';

@Directive({
  selector: '[checkPermissionTask]'
})
export class CheckPermissionTaskDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private readonly _auth: AuthService
  ) { }

  @Input() set checkPermissionTask(userId) {
    this.viewContainer.clear();
    const check = this._auth.checkTask(userId);
    this.checkDom(check);
  }

  private checkDom(check: boolean = true) {
    if (check) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
