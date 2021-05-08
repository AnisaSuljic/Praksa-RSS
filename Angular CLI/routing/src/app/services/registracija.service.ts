import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IKlijent } from '../models/registracija.model';
import { MyConfig } from '../my-config';

@Injectable({
  providedIn: 'root'
})
export class RegistracijaService {
  klijent?:IKlijent;
  readonly _url:string = MyConfig.adresaServera + '/klijent';
  constructor(private http: HttpClient) { }

  addKlijent(klijent: IKlijent) {
    
    return this.http.post<any>(this._url, klijent);
  }
}
