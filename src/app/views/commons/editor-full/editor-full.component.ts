import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-editor-full',
  templateUrl: './editor-full.component.html',
  styleUrls: ['./editor-full.component.css']
})
export class EditorFullComponent implements OnInit {
  @Input('content') content:string
  @Output() contentChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  valueChange(content){
    this.contentChange.emit(content);
  }
}
