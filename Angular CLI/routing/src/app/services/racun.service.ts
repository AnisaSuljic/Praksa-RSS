import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRacun } from '../models/racun.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RacunService {
  private _url: string = "http://rsspraksa-api.ml/racun";
  racuni: IRacun[] = [];
  constructor(private http: HttpClient) { this.racuni = []; }
  getRacuni(): Observable<IRacun[]>{
    return this.http.get<IRacun[]>(this._url);
  }
  addRacun(racun: IRacun) {
    return this.http.post<any>(this._url, racun);
  }
  getRacunById(id: number): Observable<IRacun>{
    const url = `${this._url}/${id}`;
    return this.http.get<IRacun>(url);
  }
  deleteRacun(id:number):Observable<IRacun>{
    const url = `${this._url}/${id}`;
    return this.http.delete<IRacun>(url);
  }
}
