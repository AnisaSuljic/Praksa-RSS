import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStavka } from '../models/stavka.model';
import { catchError } from 'rxjs/operators';
import { Vrsta } from '../models/vrsta.model';
import { NgForm } from '@angular/forms';
import { ItemsComponent } from '../items/items.component';
import { MyConfig } from '../my-config';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class VrstaService {
  currUser!: User;
  readonly _url:string = MyConfig.adresaServera + '/vrsta';
  Vrsta: Vrsta[] = [];
  constructor(private http: HttpClient, private _korisnikService: UserService) 
  {
    this._korisnikService.ucitajKorisnika().subscribe(res=> { this.currUser = this._korisnikService.currUser; });
    this.Vrsta = []; }
  formData:Vrsta = new Vrsta();
  getVrsta(): Observable<Vrsta[]>{
    return this.http.get<Vrsta[]>(this._url);
  }
  addVrsta(Vrsta: Vrsta) {
    Vrsta.klijentId = this.currUser?.klijentId!;
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
