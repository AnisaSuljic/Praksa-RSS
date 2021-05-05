import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStavka } from '../models/stavka.model';
import { catchError } from 'rxjs/operators';
import { Vrsta } from '../models/vrsta.model';
import { NgForm } from '@angular/forms';
import { ItemsComponent } from '../items/items.component';
import { MyConfig } from '../my-config';

@Injectable({
  providedIn: 'root'
})
export class VrstaService {

  readonly _url:string = MyConfig.adresaServera + '/vrsta';
  Vrsta: Vrsta[] = [];
  constructor(private http: HttpClient) { this.Vrsta = []; }
  formData:Vrsta = new Vrsta();
  getVrsta(): Observable<Vrsta[]>{
    return this.http.get<Vrsta[]>(this._url);
  }
  addVrsta(Vrsta: Vrsta) {
    return this.http.post<any>(this._url, Vrsta);
  }
  updateVrsta(id: number, item: Vrsta){
    const url = `${this._url}/${id}`;
    return this.http.put<Vrsta>(url, item);
  }
  getVrstaById(id: number): Observable<Vrsta>{
    const url = `${this._url}/${id}`;
    return this.http.get<Vrsta>(url);
  }
  deleteVrsta(id:number):Observable<Vrsta>{
    const url = `${this._url}/${id}`;
    return this.http.delete<Vrsta>(url);
  }
}
