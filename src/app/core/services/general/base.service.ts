
import { environment } from 'src/environments/environment';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { createStore } from 'devextreme-aspnet-data-nojquery';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { IBaseService } from '../../models/general/base';
import { OperationResult } from '../../models/system/operation-result';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../system/auth.service';
import { UserToken } from '../../models/dtos/user-token';
import { take } from 'rxjs/operators';
const API_URL = environment.apiUrl;

export class BaseService<T> implements IBaseService<T> {
  requests: string[] = [];
  private user:UserToken;
  constructor(
    private authService:AuthService,
    public http: HttpClient,
    private entity: string,
    private title: Title) {
      this.authService.currentUser$.pipe(take(1)).subscribe(user => {
        this.user = user;
      })
  }

  setTitle(titleString: string) {
    this.title.setTitle(titleString);
  }
  add(entity) :Observable<OperationResult> {
    return this.http.post<OperationResult>(`${API_URL}/${this.entity}/Add`, entity);
  }
  update(entity):Observable<OperationResult>{
    return this.http.put<OperationResult>(`${API_URL}/${this.entity}/Update`, entity)
  }
  remove(id: any):Observable<OperationResult> {
    return this.http.delete<OperationResult>(`${API_URL}/${this.entity}/Delete`, { params: { key: id } });
  }
  findById(id: any):Observable<T>{
    return this.http.get<T>(`${API_URL}/${this.entity}/FindById`, { params: { id: id } });
  }

  validate(entity: T): Observable<boolean> {
    return this.http.post<boolean>(`${API_URL}/${this.entity}/Validate`, entity);
  }

  getAll():Observable<Array<T>> {
    return this.http.get<Array<T>>(`${API_URL}/${this.entity}/GetAll`);
  }
  loadDataSourceLookup() {
      let self = this;
      return new DataSource({
        store: createStore({
          key: `Id`,
          loadUrl: `${API_URL}/${this.entity}/LoadDxoLookup`,
          onBeforeSend: function (method, ajaxOptions) {
            ajaxOptions.headers = {
              Authorization: `Bearer ${self.user.token}`
            }
          }
        }),
        paginate: true,
        pageSize: 10
      });
  }

  loadDataSourceLookupFilter(filter:any= ["Status", "=", 1]) {
      let self = this;
      return new DataSource({
        store: createStore({
          key: `Id`,
          loadUrl: `${API_URL}/${this.entity}/LoadDxoLookup`,
          onBeforeSend: function (method, ajaxOptions) {
            ajaxOptions.headers = {
              Authorization: `Bearer ${self.user.token}`
            }
          }
        }),
        paginate: true,
        pageSize: 10,
        filter: filter
      });
  }
  loadDataSourceLookupFilterSort(filter= ["Status", "=", 1], sortKey = [{ selector : "Id", desc : false }]) {

    let self = this;
    return new DataSource({
      store: createStore({
        key: `Id`,
        loadUrl: `${API_URL}/${this.entity}/LoadDxoLookup`,
        onBeforeSend: function (method, ajaxOptions) {
          ajaxOptions.headers = {
            Authorization: `Bearer ${self.user.token}`
          }
        }
      }),
      paginate: true,
      pageSize: 10,
      filter: filter,
      sort:sortKey
    });
}
  loadStoreLookup() {

    let self = this;
    return {
      store: createStore({
        key: "Id",
        loadUrl: `${API_URL}/${this.entity}/LoadDxoLookup`,
        onBeforeSend: function (method, ajaxOptions) {
          ajaxOptions.headers = {
            Authorization: `Bearer ${self.user.token}`
          }
        }
      }),
      paginate: true,
      pageSize: 10
    }
  }

  loadStoreLookupFilter(filter: any= ["Status", "=", 1]) {

    let self = this;
    return {
      store: createStore({
        key: "Id",
        loadUrl: `${API_URL}/${this.entity}/LoadDxoLookup`,
        onBeforeSend: function (method, ajaxOptions) {
          ajaxOptions.headers = {
            Authorization: `Bearer ${self.user.token}`
          }
        }
      }),
      paginate: true,
      pageSize: 10,
      filter: filter
    }
  }

  loadDataGrid() {

    let self = this;
    let entity = this.entity;
    return new DataSource({
      store: createStore({
        key: `Id`,
        loadUrl: `${API_URL}/${this.entity}/LoadDxoGrid`,
        deleteUrl: `${API_URL}/${this.entity}/Delete${this.entity}`,
        updateUrl: `${API_URL}/${this.entity}/Update${this.entity}`,
        insertUrl: `${API_URL}/${this.entity}/Add${this.entity}`,
        onBeforeSend: function (method, ajaxOptions) {
          ajaxOptions.headers = {
            Authorization: `Bearer ${self.user.token}`
          }
        }
      }),
      map: (item) => {
        // item.Status = item.Status==true?1:0;
        // item.Avatar = 'api/'+item.Avatar.replace("{0}","Sm")
        return item;
      }
    });
  }

  loadDataGridFilter(filter:any = ["Status", "=", 0]) {

    let self = this;
    let entity = this.entity;
    return new DataSource({
      store: createStore({
        key: `Id`,
        loadUrl: `${API_URL}/${this.entity}/LoadDxoGrid`,
        deleteUrl: `${API_URL}/${this.entity}/Delete${this.entity}`,
        updateUrl: `${API_URL}/${this.entity}/Update${this.entity}`,
        insertUrl: `${API_URL}/${this.entity}/Add${this.entity}`,
        onBeforeSend: function (method, ajaxOptions) {
          ajaxOptions.data.KeyId = "Id";
          ajaxOptions.headers = {
            Authorization: `Bearer ${self.user.token}`
          }
        }
      }),
      filter: filter,
      map: (item) => {
        item.Status = item.Status==true?1:0;
        return item;
      }
    });
  }

  loadDataGridAction(actionLoad: string, actionDelete: string, actionInsert: string, actionUpdate: string) {

    let self = this;
    let entity = this.entity;
    return new DataSource({
      store: createStore({
        key: `Id`,
        loadUrl: `${API_URL}/${this.entity}/${actionLoad}`,
        deleteUrl: `${API_URL}/${this.entity}/${actionDelete}`,
        updateUrl: `${API_URL}/${this.entity}/${actionUpdate}`,
        insertUrl: `${API_URL}/${this.entity}/${actionInsert}`,
        onBeforeSend: function (method, ajaxOptions) {
          ajaxOptions.data.KeyId = `Id`;
          ajaxOptions.headers = {
            Authorization: `Bearer ${self.user.token}`
          }
        }
      }),
      map: (item) => {
        item.Status = item.Status==true?1:0;
        return item;
      }
    });
  }

  loadDataGridActionFilter(actionLoad: string, actionDelete: string, actionInsert: string, actionUpdate: string, filter = ["Status", "=", 0]) {

    let self = this;
    let entity = this.entity;
    return new DataSource({
      store: createStore({
        key: `Id`,
        loadUrl: `${API_URL}/${this.entity}/${actionLoad}`,
        deleteUrl: `${API_URL}/${this.entity}/${actionDelete}`,
        updateUrl: `${API_URL}/${this.entity}/${actionUpdate}`,
        insertUrl: `${API_URL}/${this.entity}/${actionInsert}`,
        onBeforeSend: function (method, ajaxOptions) {
          ajaxOptions.data.KeyId = `Id`;
          ajaxOptions.headers = {
            Authorization: `Bearer ${self.user.token}`
          }
        }
      }),
      filter: filter,
      map: (item) => {
        item.Status = item.Status==true?1:0;
        return item;
      }
    });
  }


}
