import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grad } from '../models/grad.model';
import { Skladiste } from '../models/skladiste.model';
import { MyConfig } from '../my-config';
import { UserService } from './user.service';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class SkladisteService {

  readonly _url:string = MyConfig.adresaServera + '/skladiste';
  skladiste: Skladiste[] = [];
  currUser!: User;
  constructor(private http:HttpClient, private _korisnikService: UserService) { 
    this._korisnikService.ucitajKorisnika().subscribe(res=> { this.currUser = this._korisnikService.currUser; });
    this.skladiste = []; }
  formData:Skladiste = new Skladiste();
  getSkladiste():Observable<Skladiste[]>{
    return this.http.get<Skladiste[]>(this._url);
  }
  addSkladiste(Skladiste: Skladiste) {
    Skladiste.klijentId = this.currUser?.klijentId!;
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