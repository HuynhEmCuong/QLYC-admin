import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserToken } from '../../models/dtos/user-token';
const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }
  savePermission = (model)=> this.http.post(`${API_URL}/Permission/SavePermission`,model);

  checkPermission(functionCode,action){
    let roles=JSON.parse(localStorage.getItem("roles"));
    let model={
      functionCode: functionCode,
      action:action,
      roles:roles
    };
    return this.http.post(`${API_URL}/Permission/CheckPermission`,model);

  };

  getFuntionsByRole= (roleId)=> this.http.get(`${API_URL}/Permission/GetAllFunctionRole?roleId=${roleId}`);

  getPermissionUserByRoles(){
    let roles=JSON.parse(localStorage.getItem("roles"));
    if(typeof roles == "string"){
      roles= [roles];
    }
    return this.http.post(`${API_URL}/Permission/GetPermissionByRole`,roles);
  }

  checkAccess(functionCode: string) {
    var result: boolean = false;
    let user: UserToken = JSON.parse(localStorage.getItem("user"));
    if(user.roles.find(role => role.toUpperCase() =='ADMIN')){
      return true;
    }

    var hasPermission: number = user.permissions.findIndex(x => x.FunctionCode == functionCode && x.CanRead == true);
    if (hasPermission != -1) {
      return true;
    }
    else
      return false;
  }

  hasPermission(functionCode: string, action: string): boolean {
    var result: boolean = false;
    var user: UserToken = JSON.parse(localStorage.getItem("user"));
    var result: boolean = false;
    if(user!=null && functionCode !=null && action !=null){
      if(user.roles.find(role => role.toUpperCase() =='ADMIN')){
        result = true;
      }
      else{
        let permissions = user.permissions.find(x=>x.FunctionCode == functionCode);
        if(permissions!=null){
          switch (action) {
            case 'CREATE':
              return permissions.CanCreate
            case 'UPDATE':
              return permissions.CanUpdate
            case 'DELETE':
              return permissions.CanDelete
            case 'READ':
              return permissions.CanRead
            case 'APPROVAL':
              return permissions.CanApproval
          }
        }
      }

    return result;
  }
  }
}
