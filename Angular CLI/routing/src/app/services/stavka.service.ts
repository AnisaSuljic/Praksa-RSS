import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStavka } from '../models/stavka.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StavkaService {
  private _url: string = "http://rsspraksa-api.ml/Stavke";
  Stavka: IStavka[] = [];
  constructor(private http: HttpClient) { this.Stavka = []; }
  getStavke(): Observable<IStavka[]>{
    return this.http.get<IStavka[]>(this._url);
  }
  addStavka(Stavka: IStavka) {
    return this.http.post<any>(this._url, Stavka);
  }
  updateStavka(id: number, item: IStavka){
    const url = `${this._url}/${id}`;
    return this.http.put<IStavka>(url,item);
  }
  getStavkaById(id: number): Observable<IStavka>{
    const url = `${this._url}/${id}`;
    return this.http.get<IStavka>(url);
  }
  deleteStavka(id:number):Observable<IStavka>{
    const url = `${this._url}/${id}`;
    return this.http.delete<IStavka>(url);
  }
}
