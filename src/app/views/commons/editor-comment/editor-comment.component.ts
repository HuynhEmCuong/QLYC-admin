import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'editor-comment',
  templateUrl: './editor-comment.component.html',
  styleUrls: ['./editor-comment.component.css']
})
export class EditorCommentComponent implements OnInit {

  @Input('content') inputContent: string = "";
  @Output() contentChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {

  }

  onValueChanged(e){
    this.contentChange.emit(this.inputContent);
   
  }

 
}
