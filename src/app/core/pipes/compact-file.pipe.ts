import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({ name: 'compactFile'})
export class CompactFilePipe implements PipeTransform  {
  transform(value) {
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(value)[1];
    let fileName = value.replace(ext,"");
    if(fileName.length>10){
      fileName= fileName.slice(0,10) +"..."+ext;
    }
    else{
      fileName = value;
    }
    return fileName;
  }
}
