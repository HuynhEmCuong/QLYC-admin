import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { environment } from 'src/environments/environment';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { AuthService } from '../system/auth.service';
import { take } from 'rxjs/operators';
import { UserToken } from '../../models/dtos/user-token';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DevextremeService {
  private user:UserToken;
  constructor(private http: HttpClient ,private authService:AuthService) {
    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    })
  }

  loadDataGrid(entity) {

    let self = this;
    return new DataSource({
      store: createStore({
        key: `Id`,
        loadUrl: `${API_URL}/${entity}/LoadDxoGrid`,
        deleteUrl: `${API_URL}/${entity}/Delete${entity}`,
        updateUrl: `${API_URL}/${entity}/Update${entity}`,
        insertUrl: `${API_URL}/${entity}/Add${entity}`,
        onBeforeSend: function (method, ajaxOptions) {
          ajaxOptions.data.keyId = entity + "Id";
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
  loadDataGridFilter(entity, filter = ["Status", "=", 0]) {

    let self = this;
    return new DataSource({
      store: createStore({
        key: `Id`,
        loadUrl: `${API_URL}/${entity}/LoadDxoGrid`,
        deleteUrl: `${API_URL}/${entity}/Delete${entity}`,
        updateUrl: `${API_URL}/${entity}/Update${entity}`,
        insertUrl: `${API_URL}/${entity}/Add${entity}`,
        onBeforeSend: function (method, ajaxOptions) {
          ajaxOptions.data.keyId = entity + "Id";
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
  //Load danh s??ch l??n grid, th??m, x??a, s???a m???c ?????nh c???a devextreme
  loadDxoGridAction(entity, actionLoad = "", actionDelete = "", actionInsert = "", actionUpdate = "") {

    let self = this;
    return new DataSource({
      store: AspNetData.createStore({
        key: "Id",
        loadUrl: `${API_URL}/${entity}/${actionLoad}`,
        deleteUrl: `${API_URL}/${entity}/${actionDelete}`,
        updateUrl: `${API_URL}/${entity}/${actionUpdate}`,
        insertUrl: `${API_URL}/${entity}/${actionInsert}`,
        onBeforeSend: function (method, ajaxOptions) {
          ajaxOptions.data.keyId = entity + "Id";
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
  //Load danh s??ch l??n grid, th??m, x??a, s???a m???c ?????nh c???a devextreme
  loadDxoGridActionFilter(entity, actionLoad = "", actionDelete = "", actionInsert = "", actionUpdate = "",filter= ["Status", "=", 1]) {

    let self = this;
    return new DataSource({
      store: AspNetData.createStore({
        key:  "Id",
        loadUrl: `${API_URL}/${entity}/${actionLoad}`,
        deleteUrl: `${API_URL}/${entity}/${actionDelete}`,
        updateUrl: `${API_URL}/${entity}/${actionUpdate}`,
        insertUrl: `${API_URL}/${entity}/${actionInsert}`,
        onBeforeSend: function (method, ajaxOptions) {
          ajaxOptions.data.keyId = entity + "Id";
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

  //Load select box (Ch??? d??ng tr??n Datagrid)
  loadStoreDxoLookup(entity) {

    let self = this;
    return {
      store: createStore({
        key: "Id",
        loadUrl: `${API_URL}/${entity}/LoadDxoLookup`,
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
  //Load select box (Ch??? d??ng tr??n Datagrid)
  loadStoreDxoLookupFilter(entity, filter= ["Status", "=", 1]) {

    let self = this;
    return {
      store: createStore({
        key: "Id",
        loadUrl: `${API_URL}/${entity}/LoadDxoLookup`,
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

  //Load select box (D??ng tr??n form)
  loadDataSourceDxoLookupFilter(entity, filter = ["Status", "=", 1]) {

    let self = this;
      return new DataSource({
        store: createStore({
          key: `Id`,
          loadUrl: `${API_URL}/${entity}/LoadDxoLookup`,
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

  //Load select box (D??ng tr??n form)
  loadDataSourceDxoLookup(entity) {

    let self = this;
      return new DataSource({
        store: createStore({
          key: `Id`,
          loadUrl: `${API_URL}/${entity}/LoadDxoLookup`,
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
}
