import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJedinicaMjere } from '../models/jedinicamjere.model';
import { MyConfig } from '../my-config';

@Injectable({
  providedIn: 'root'
})
export class JedinicamjereService {
  readonly _url:string = MyConfig.adresaServera + '/JedinicaMjere';
  JedinicaMjerei: IJedinicaMjere[] = [];
  constructor(private http: HttpClient) { this.JedinicaMjerei = []; }
  getJedinicaMjere(): Observable<IJedinicaMjere[]>{
    return this.http.get<IJedinicaMjere[]>(this._url);
  }
  addJedinicaMjere(JedinicaMjere: IJedinicaMjere) {
    return this.http.post<any>(this._url, JedinicaMjere);
  }
  updateJedinicaMjere(id: number, item: IJedinicaMjere){
    const url = `${this._url}/${id}`;
    return this.http.put<IJedinicaMjere>(url,item);
  }
  getJedinicaMjereById(id: number): Observable<IJedinicaMjere>{
    const url = `${this._url}/${id}`;
    return this.http.get<IJedinicaMjere>(url);
  }
  deleteJedinicaMjere(id:number):Observable<IJedinicaMjere>{
    const url = `${this._url}/${id}`;
    return this.http.delete<IJedinicaMjere>(url);
  }
}
