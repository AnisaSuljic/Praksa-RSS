import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grad } from '../models/grad.model';
import { MyConfig } from '../my-config';
import { UserService } from './user.service';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class GradService {
  //private _url = 'http://rsspraksa-api.ml/grad';
  readonly _url:string = MyConfig.adresaServera + '/grad';
  grad: Grad[] = [];
  currUser!: User;
  constructor(private http:HttpClient, private _korisnikService: UserService) { 
    this._korisnikService.ucitajKorisnika().subscribe(res=> { this.currUser = this._korisnikService.currUser; });
    this.grad = []; }
  formData:Grad=new Grad();
  getGrad():Observable<Grad[]>{
    return this.http.get<Grad[]>(this._url);
  }
  addGrad(Grad: Grad) {
    Grad.klijentId = this.currUser?.klijentId!;
    return this.http.post<any>(this._url, Grad);
  }
  updateGrad(id: number, item: Grad){
    const url = `${this._url}/${id}`;
    return this.http.put<Grad>(url,item);
  }
  getGradById(id: number): Observable<Grad>{
    const url = `${this._url}/${id}`;
    return this.http.get<Grad>(url);
  }
  deleteGrad(id:number):Observable<Grad>{
    const url = `${this._url}/${id}`;
    return this.http.delete<Grad>(url);
  }

}