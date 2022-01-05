import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { LoginDto } from 'src/app/core/models/dtos/login';
import { UserToken } from 'src/app/core/models/dtos/user-token';
import { AuthenticationResult } from 'src/app/core/models/system/authentication-result';
import { OperationResult } from 'src/app/core/models/system/operation-result';
import { AuthService } from 'src/app/core/services/system/auth.service';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.css']
})
export class LockScreenComponent implements OnInit {
  entity:LoginDto = new LoginDto();
  laddaSubmitLoading:boolean=false;
  user:UserToken;
  constructor(public authService:AuthService, private router: Router,private routeActive: ActivatedRoute) {
    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.entity.username = user.unique_name;
    })
   }

  ngOnInit() {
    if(this.user==null){
      this.router.navigateByUrl('auth/login');
    }
  }

  login(){
    this.laddaSubmitLoading = true;
    this.authService.login(this.entity).subscribe((result:OperationResult)=>{
      if(result.Success){
        const returnUrl = this.routeActive.snapshot.queryParams.returnUrl;
        if (returnUrl !== "" && returnUrl != null) {
          this.router.navigate([returnUrl]);
        } else {
          this.router.navigate(["/pages"]);
        }
      }
      this.laddaSubmitLoading =false;

    })
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

}
