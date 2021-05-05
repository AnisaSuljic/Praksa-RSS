import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grad } from '../models/grad.model';
import { Skladiste } from '../models/skladiste.model';
@Injectable({
  providedIn: 'root'
})
export class SkladisteService {

  private _url = 'http://rsspraksa-api.ml/skladiste';
  skladiste: Skladiste[] = [];
  constructor(private http:HttpClient) { this.skladiste = []; }
  formData:Skladiste = new Skladiste();
  getSkladiste():Observable<Skladiste[]>{
    return this.http.get<Skladiste[]>(this._url);
  }
  addSkladiste(Skladiste: Skladiste) {
    return this.http.post<any>(this._url, Skladiste);
  }
  updateSkladiste(id: number, item: Skladiste){
    const url = `${this._url}/${id}`;
    return this.http.put<Skladiste>(url,item);
  }
  getSkladisteById(id: number): Observable<Skladiste>{
    const url = `${this._url}/${id}`;
    return this.http.get<Skladiste>(url);
  }
  deleteSkladiste(id:number):Observable<Skladiste>{
    const url = `${this._url}/${id}`;
    return this.http.delete<Skladiste>(url);
  }
}