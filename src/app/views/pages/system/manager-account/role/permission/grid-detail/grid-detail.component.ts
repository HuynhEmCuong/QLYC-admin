import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Function } from 'src/app/core/models/system/function';
import { Permission } from 'src/app/core/models/system/permision';

@Component({
  selector: 'app-grid-detail',
  templateUrl: './grid-detail.component.html',
  styleUrls: ['./grid-detail.component.css']
})
export class GridDetailComponent implements OnInit {
  @Input() functions:Array<Permission>
  @Input() id:number;
  dataSource:any;
  constructor() { }

  ngOnInit() {
  }

  checkRowChange(e){
    if(e.column.dataField =="CheckRow"){
      this.dataSource.map(item=>{
        if(item.FunctionId == e.data.FunctionId){
          item.CanDelete = item.CanRead = item.CanCreate = item.CanUpdate = item.CheckRow = e.value;
          e.data.CanDelete = e.data.CanRead = e.data.CanCreate = e.data.CanUpdate= e.data.CheckRow = e.value;
          return item;
        }
      })
    }

  }


  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = this.functions.filter(x=>x.ParentId == this.id);
  }
}
