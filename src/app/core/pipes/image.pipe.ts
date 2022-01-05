import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
@Pipe({ name: 'image'})
export class ImagePipe implements PipeTransform  {
  transform(value,isUser=false) {
    let urlImg="";
    if(value!=""&&value!=null){
      urlImg=environment.apiUrl+"/"+value;
    }
    else{
      urlImg=isUser?'/assets/images/users/profile.jpg':'/assets/images/noimage.png';
    }
    return urlImg;
  }
}
