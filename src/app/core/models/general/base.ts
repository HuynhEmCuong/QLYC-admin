import { Observable, of } from 'rxjs';
import { OperationResult } from '../system/operation-result';

export interface IBaseService<T>{
  add(entity: T): Observable<OperationResult>;
  update(entity: T): Observable<OperationResult>;
  remove(id) : Observable<OperationResult>;
  findById(id):Observable<T>;
  validate(entity: T): Observable<boolean>;
  getAll():Observable<Array<T>>;
  loadDataSourceLookup(filter:[]);
  loadStoreLookup(filter:[]);
  loadDataGrid(filter:[]);
  loadDataGridAction(actionLoad:string, actionDelete:string, actionInsert:string, actionUpdate:string,filter:[]);
  setTitle(titleString: string);

}
