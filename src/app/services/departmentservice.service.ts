import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageServiceService } from './storage-service.service';
Observable

@Injectable({
  providedIn: 'root'
})
export class DepartmentserviceService {

  constructor(private http :HttpClient,private storageService:StorageServiceService) { }
  maindata = JSON.parse(localStorage.getItem('currentUser')|| '{}');
  token = this.maindata['accessToken'];
  httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${this.token }`,
    }),
  };

  
  getAllData(page:number):Observable<any>{
    return this.http.get(`http://65.0.155.254:5001/admin/department/list` + '?page='+ page,this.httpOptions);
  }

  importCsvFile(data:any):Observable<any>{
    return this.http.post(`http://65.0.155.254:5001/admin/department/import`,data,this.httpOptions);
  }
}
