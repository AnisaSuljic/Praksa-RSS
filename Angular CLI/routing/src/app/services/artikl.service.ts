import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArtikl } from '../models/artikl.model';
import { catchError } from 'rxjs/operators';
import { MyConfig } from '../my-config';

@Injectable({
  providedIn: 'root'
})
export class ArtiklService {
  readonly _url:string = MyConfig.adresaServera + '/artikl';
  Artikli: IArtikl[] = [];
  constructor(private http: HttpClient) { this.Artikli = []; }
  getArtikli(): Observable<IArtikl[]>{
    return this.http.get<IArtikl[]>(this._url);
  }
  addArtikl(Artikl: IArtikl) {
    return this.http.post<any>(this._url, Artikl);
  }
  updateArtikl(id: number, item: IArtikl){
    const url = `${this._url}/${id}`;
    return this.http.put<IArtikl>(url,item);
  }
  getArtiklById(id: number): Observable<IArtikl>{
    const url = `${this._url}/${id}`;
    return this.http.get<IArtikl>(url);
  }
  deleteArtikl(id:number):Observable<IArtikl>{
    const url = `${this._url}/${id}`;
    return this.http.delete<IArtikl>(url);
  }
}
