import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Groups } from '../models/grupe.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private _url = 'http://rsspraksa-api.ml/grupa';
  grupe: Groups[] = [];
  constructor(private http:HttpClient) { this.grupe = []; }

  getGroups():Observable<Groups[]>{
    return this.http.get<Groups[]>(this._url);
  }
  addGroups(Grupa: Groups) {
    return this.http.post<any>(this._url, Grupa);
  }
  updateGroups(id: number, item: Groups){
    const url = `${this._url}/${id}`;
    return this.http.put<Groups>(url,item);
  }
  getGroupsById(id: number): Observable<Groups>{
    const url = `${this._url}/${id}`;
    return this.http.get<Groups>(url);
  }
  deleteGroups(id:number):Observable<Groups>{
    const url = `${this._url}/${id}`;
    return this.http.delete<Groups>(url);
  }
}
