import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRacun } from '../models/racun.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RacunService {
  private _url: string = "https://localhost:44300/racun";
  racuni: IRacun[] = [];
  constructor(private http: HttpClient) { this.racuni = []; }
  getRacuni(): Observable<IRacun[]>{
    return this.http.get<IRacun[]>(this._url);
  }
  addRacun(racun: IRacun) {
    return this.http.post<any>(this._url, racun);
  } 
}
