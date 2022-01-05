import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginDto } from 'src/app/core/models/dtos/login';
import { AuthenticationResult } from 'src/app/core/models/system/authentication-result';
import { OperationResult } from 'src/app/core/models/system/operation-result';
import { AlertifyService } from 'src/app/core/services/general/alertify.service';
import { AuthService } from 'src/app/core/services/system/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  entity: LoginDto = new LoginDto();
  jwtHelper = new JwtHelperService();
  laddaSubmitLoading: boolean = false;
  constructor(private authService: AuthService, private router: Router, private alertService: AlertifyService) { }

  ngOnInit() {
    let infoAccount = localStorage.getItem("access_login");
    if (infoAccount != null) {
      this.entity = JSON.parse(infoAccount);
    }
  }

  login() {
    this.laddaSubmitLoading = true;
    this.authService.login(this.entity).subscribe(
      (res: OperationResult) => {
        if (res.Success) {
          if (this.entity.rememberme) {
            localStorage.setItem("access_login", JSON.stringify(this.entity));
          }
          else {
            localStorage.removeItem("access_login");
          }
          this.router.navigate(['pages']);
        }
        this.laddaSubmitLoading = false;
      },
      error => {
        this.laddaSubmitLoading = false;
      })
  }

}
