export function cloneData(data){
    return JSON.parse(JSON.stringify(data));
}

export function diffDateTime(dt1:any,dt2:any){
  var diffMs = (dt2 - dt1);
  var diffDays = Math.floor(diffMs / 86400000); // days
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = ((diffMs % 86400000) % 3600000) / 60000; // minutes
  //console.log("Thời gian hết hạn token: " +diffDays*24*60*60 + diffHrs*60*60+diffMins*60 +" giây")
  return (diffDays*24*60*60 + diffHrs*60*60+diffMins*60);
}

export function blobToFile(theBlob: Blob, fileName:string): File{
  var b: any = theBlob;
  b.lastModifiedDate = new Date();
  b.name = fileName;
  return <File>theBlob;
}

export function unflattern(arr) {
  let arrayParent = arr.filter(x=>x.ParentId==0);
  for (var i = 0; i < arrayParent.length; i++) {
    var node = arrayParent[i];
    node.children = [];

    let childs = arr.filter(x=>x.ParentId ==node.Id);
    if(childs.length>0){
      for(var j =0 ; j < childs.length;j++){
          let nodeSub = childs[j];
          nodeSub.children=[];
          nodeSub.children =  nodeSub.children.concat(arr.filter(x=>x.ParentId == nodeSub.Id))
      }
      node.children =node.children.concat(childs);
    }
  }
  return arrayParent;
}

export function dateConvertToString(date?: Date) {
  if (date == null) return null;
  date = new Date(date);
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0');
  var yyyy = date.getFullYear();
  return yyyy + '-' + mm + '-' + dd + 'T00:00:00';

}

export function  safeIdEntity(entity){
  for (const property in entity) {
    if(typeof entity[property]=="object" &&  entity[property]!=null){
      if( entity[property] instanceof Date){
        entity[property] = dateConvertToString(entity[property]);
      }

      //Nếu là mảng
      if( entity[property] instanceof Array && entity[property].length>0){
       for(var i=0; i< entity[property].length ; i++){
        for (const propertySub in entity[property][i]) {
          if((propertySub.toString().includes('Id') && typeof entity[property][i][propertySub] =="string")
              || (propertySub.toString().includes('Id') && typeof entity[property][i][propertySub] == "number" && entity[property][i][propertySub] < 0) ){
            entity[property][i][propertySub] =0;
          }
          // else if(typeof entity[property][i][propertySub] =="object"){
          //   for(var j = 0; j< entity[property][i][propertySub].length ;j++){
          //     this.safeIdEntity(entity[property][i][propertySub][j]);
          //     }
          //   }
           }
        }
      }
      }

    }
}
export function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

//  -1 : if d1 < d2
//   0 : if d1 = d2
//   1 : if d1 > d2
export function compareDate(d1: any, d2: any) {

  if(typeof d1 =="string"){
    d1 = new Date(d1);
  }
  if(typeof d2 =="string"){
    d2 = new Date(d2);
  }

  let d1withoutTime = withoutTime(d1);
  let d2withoutTime = withoutTime(d2);
  if (d1withoutTime < d2withoutTime)
    return -1;
  else if (d1withoutTime > d2withoutTime) {
    return 1;
  }
  else
    return 0;

}

export function withoutTime(date: Date): Date {
  date.setHours(0, 0, 0, 0);
  return date;
}


