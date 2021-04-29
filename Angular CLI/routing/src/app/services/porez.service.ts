import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Porez } from '../models/porez.model';

@Injectable({
  providedIn: 'root'
})
export class PorezService {
  private _url = 'https://localhost:44300/porez';
  porez: Porez[] = [];
  constructor(private http:HttpClient) { this.porez = []; }

  getPorez():Observable<Porez[]>{
    return this.http.get<Porez[]>(this._url);
  }
  addPorez(Porez: Porez) {
    return this.http.post<any>(this._url, Porez);
  }
  updatePorez(id: number, item: Porez){
    const url = `${this._url}/${id}`;
    return this.http.put<Porez>(url,item);
  }
  getPorezById(id: number): Observable<Porez>{
    const url = `${this._url}/${id}`;
    return this.http.get<Porez>(url);
  }
  deletePorez(id:number):Observable<Porez>{
    const url = `${this._url}/${id}`;
    return this.http.delete<Porez>(url);
  }

}