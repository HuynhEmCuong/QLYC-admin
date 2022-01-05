import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { unflattern } from 'src/app/core/common/helper';
import { UserToken } from 'src/app/core/models/dtos/user-token';
import { Function, Module } from 'src/app/core/models/system/function';
import { AuthService } from 'src/app/core/services/system/auth.service';
import { FunctionService } from 'src/app/core/services/system/function.service';
import { navigation } from '../../../app-navigation';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  navigations:any;
  user:UserToken;
  constructor(
    public authService:AuthService,
    private functionService: FunctionService,
    private route: ActivatedRoute,
    ) {
      this.authService.currentUser$.pipe(take(1)).subscribe(user => {
        this.user = user;
      })
     }

   ngOnInit() {
    let functions  = this.route.snapshot.data["funcions"] as Array<Function>;
    this.navigations = unflattern(functions);
  }
}
