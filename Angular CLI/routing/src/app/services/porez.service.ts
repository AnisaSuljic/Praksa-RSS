import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Porez } from '../models/porez.model';
import { MyConfig } from '../my-config';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PorezService {
  readonly _url:string = MyConfig.adresaServera + '/porez';
  porez: Porez[] = [];
  currUser!: User;
  constructor(private http:HttpClient, private _korisnikService: UserService) {
    this._korisnikService.ucitajKorisnika().subscribe(res=> { this.currUser = this._korisnikService.currUser; });
    this.porez = []; }
  formData:Porez=new Porez();
  getPorez():Observable<Porez[]>{
    return this.http.get<Porez[]>(this._url);
  }
  addPorez(Porez: Porez) {
    Porez.klijentId = this.currUser?.klijentId!;
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