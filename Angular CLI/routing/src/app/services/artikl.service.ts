import { APP_INITIALIZER, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArtikl } from '../models/artikl.model';
import { catchError } from 'rxjs/operators';
import { MyConfig } from '../my-config';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ArtiklService {
  readonly _url:string = MyConfig.adresaServera + '/artikl';
  Artikli: IArtikl[] = [];
  currUser!: User;
  constructor(private http: HttpClient, private _korisnikService: UserService) {
    this._korisnikService.ucitajKorisnika().subscribe(res => {
      this._korisnikService.promise.then(res => {
        this.currUser = res;
      })
    }); 
    this.Artikli = []; }
  formData:IArtikl=new IArtikl();
  getArtikli(): Observable<IArtikl[]>{
    return this.http.get<IArtikl[]>(this._url);
  }
  addArtikl(Artikl: IArtikl) {
    Artikl.klijentId = this.currUser?.klijentId!;
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
