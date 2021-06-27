import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { HttpClient } from '@angular/common/http';
import { MyConfig } from '../my-config';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clients: Client[]=[];
  client:Client = new Client();
  formData:Client = new Client();
  currUser?: User;
  constructor(private http:HttpClient, private _korisnikService: UserService) { 
    this._korisnikService.ucitajKorisnika().subscribe(res=> {
      this.currUser = this._korisnikService.currUser;
    });
  }
  
  readonly url:string = MyConfig.adresaServera + '/klijent';
  get(){
    return this.http.get(this.url).toPromise().then(res => { this.clients = res as Client[]; });
  }
  getClients(): Observable<Client[]>{
    return this.http.get<Client[]>(this.url);
  }
  getClientById(id: number | undefined): Observable<Client>{
    const _url = `${this.url}/${id}`;
    return this.http.get<Client>(_url);
  }
  getClientById2(id: number | undefined){
    const url = `${this.url}/${id}`;
    return this.http.get(url).toPromise().then(res => {this.client = res as Client; });
  }
  postClient(): Observable<Client>{
    return this.http.post<Client>(this.url,this.formData);
  }
  putClient(): Observable<Client>{
    return this.http.put<Client>(`${this.url}/${this.formData.klijentId}`,this.formData);
  }
  deleteClient(id:number): Observable<Client>{
    return this.http.delete<Client>(`${this.url}/${id}`);
  }
  updateClient(id: number, item: Client){
    const url = `${this.url}/${id}`;
    return this.http.put<Client>(url,item);
  }
}
