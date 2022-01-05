import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { InitCrop } from './upload-crop.custom';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/services/system/auth.service';
import { UserToken } from 'src/app/core/models/dtos/user-token';
import { take } from 'rxjs/operators';
declare var $ :any;
const API_URL= environment.apiUrl;
@Component({
  selector: 'upload-crop',
  templateUrl: './upload-crop.component.html',
  styleUrls: ['./upload-crop.component.css']
})
export class UploadCropComponent implements OnInit {
  @Input('pathFolder') pathFolder: string = "";
  @Input('urlImage') urlImage: string = "";
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  isLoading:any=false;
  user:UserToken;
  constructor(private authService:AuthService) {
    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    })
   }

  ngOnInit() {
    InitCrop(this.pathFolder,this.user.token,(result)=>{
      this.valueChange.emit(result);
      this.isLoading =false;
    });

    $("a[data-fancybox='gallery']").fancybox();
  }

  ngOnChanges(changes: SimpleChanges) {
}

}
