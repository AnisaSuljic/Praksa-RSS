import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRacun } from '../models/racun.model';
import { catchError } from 'rxjs/operators';
import { MyConfig } from '../my-config';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RacunService {
  currUser!:User;
  readonly _url:string = MyConfig.adresaServera + '/racun';
  racuni: IRacun[] = [];
  constructor(private http: HttpClient,private _korisnikService:UserService) { 
    this.racuni = []; 
    this._korisnikService.ucitajKorisnika().subscribe(res=>{this.currUser=this._korisnikService.currUser;})
  }
  getRacuni(): Observable<IRacun[]>{
    return this.http.get<IRacun[]>(this._url);
  }
  getSviRacuni(): Observable<IRacun[]>{
    return this.http.get<IRacun[]>(this._url);
  }
  addRacun(racun: IRacun) {
    racun.klijentId=this.currUser?.klijentId!;
    return this.http.post<any>(this._url, racun);
  }
  updateRacun(id: number, item: IRacun){
    const url = `${this._url}/${id}`;
    return this.http.put<IRacun>(url,item);
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
