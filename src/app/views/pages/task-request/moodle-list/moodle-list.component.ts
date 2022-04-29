import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-moodle-list',
  templateUrl: './moodle-list.component.html',
  styleUrls: ['./moodle-list.component.scss']
})
export class MoodleListComponent implements OnInit {
  dataSource: any;
  constructor(private _service: MoodleService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._service.getDataMoodle().subscribe(res => {
      this.dataSource = res;
    })
  }

}

@Injectable({
  providedIn: 'root'
})
export class MoodleService {
  api: string = environment.apiUrl;
  constructor(private readonly _http: HttpClient) {

  }

  getDataMoodle() {
    return this._http.get<MoodleModel[]>(`${this.api}/Moodle/GetCourse`)
  }
}

export class MoodleModel {
  coures_ID: string;
  course_Short_Name: string;
}
