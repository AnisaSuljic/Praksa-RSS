import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Groups } from '../models/grupe.model';
import { MyConfig } from '../my-config';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  readonly _url:string = MyConfig.adresaServera + '/grupa';
  grupe: Groups[] = [];
  currUser!: User;
  constructor(private http:HttpClient, private _korisnikService: UserService) 
  {
    this._korisnikService.ucitajKorisnika().subscribe(res=> { this.currUser = this._korisnikService.currUser; });
    this.grupe = []; }
  formData:Groups = new Groups();
  getGroups():Observable<Groups[]>{
    return this.http.get<Groups[]>(this._url);
  }
  addGroups(Grupa: Groups) {
    Grupa.klijentId = this.currUser?.klijentId!;
    return this.http.post<any>(this._url, Grupa);
  }
  updateGroups(id: number, item: Groups){
    const url = `${this._url}/${id}`;
    return this.http.put<Groups>(url,item);
  }
  getGroupsById(id: number): Observable<Groups>{
    const url = `${this._url}/${id}`;
    return this.http.get<Groups>(url);
  }
  deleteGroups(id:number):Observable<Groups>{
    const url = `${this._url}/${id}`;
    return this.http.delete<Groups>(url);
  }
}
