import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IEmployee } from './models/IEmployee.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }

  getDepartments(){
    return  this.httpClient.get<{department:string}[]>( `${environment.baseUrl}departments`);
  }

  getRoles(){
    return  this.httpClient.get<{role:string}[]>( `${environment.baseUrl}roles`);
  }

  getEmployees(){
    return  this.httpClient.get<IEmployee[]>( `${environment.baseUrl}employees`);
  }

  addEmployee(employee:IEmployee){
    return  this.httpClient.post<void>( `${environment.baseUrl}employees`,employee);
  }

  updateEmployee(employee:IEmployee){
    return  this.httpClient.put<void>( `${environment.baseUrl}employees/${employee.id}`,employee);
  }

}
