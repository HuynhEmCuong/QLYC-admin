import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { diffDateTime } from 'src/app/core/common/helper';
import { AuthenticationResult } from 'src/app/core/models/system/authentication-result';
import { OperationResult } from 'src/app/core/models/system/operation-result';
import { AuthService } from 'src/app/core/services/system/auth.service';
declare const $:any;
@Component({
  selector: 'app-modal-timeout',
  templateUrl: './modal-timeout.component.html',
  styleUrls: ['./modal-timeout.component.css']
})
export class ModalTimeoutComponent implements OnInit {
  d1:any;
  d2:any;
  second:number=0;
  secondInterval:any;
  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit() {

    this.checkExpiryToken();
  }

   refreshToken(){
     let self = this;
     clearInterval(this.secondInterval);
     this.authService.refreshToken().subscribe((response:OperationResult)=>{
       if(response.Success){
        $("#idle-timeout-dialog").modal('hide');
        self.checkExpiryToken();
       }
     });
  }

  checkExpiryToken(){
    let self = this;
    let interval =  setInterval(function(){
      self.d1 = new Date();
      self.d2 = self.authService.getTokenExpirationDate();
      // console.log(diffDateTime(self.d1,self.d2))
      if(diffDateTime(self.d1,self.d2)<31)
      {
        self.second =Math.floor(diffDateTime(self.d1,self.d2));
        clearInterval(interval);
        $("#idle-timeout-dialog").modal('show');
        self.secondInterval =  setInterval(function(){
          self.second -= 1;
          if(self.second ==0){
            $("#idle-timeout-dialog").modal('hide');
            clearInterval(self.secondInterval);
            self.router.navigate(['auth/lock']);;
          }
        },1000)
      }
    },1000)
  }
}
