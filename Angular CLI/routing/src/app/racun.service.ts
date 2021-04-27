import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { IRacun } from './racun';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RacunService {
  private _url: string = "https://localhost:44300/racun";

  constructor(private http: HttpClient) { }
  getRacuni(): Observable<IRacun[]>{
    return this.http.get<IRacun[]>(this._url);
  }
  addRacun(racun: any) {
    return this.http.post<IRacun>(this._url, racun);
  } 
}
