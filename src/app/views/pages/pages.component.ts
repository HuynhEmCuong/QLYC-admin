import { Component, OnInit } from '@angular/core';
import { initFixJQuery } from 'src/app/core/common/commons-js-func';

@Component({
  selector: 'app-pages',
  template: '<router-outlet></router-outlet>',
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    initFixJQuery();
  }
}
