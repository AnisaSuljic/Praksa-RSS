import { Injectable } from '@angular/core';
import { Client } from './client.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clients: Client[]=[];

  constructor(private http:HttpClient) { }

  readonly url = 'http://rsspraksa-api.ml/Klijent';
  formData:Client = new Client();

  getClients(){
    return this.http.get(this.url).toPromise().then(res => { this.clients = res as Client[] });
  }
  postClient(){
    return this.http.post(this.url,this.formData);
  }
  putClient(){
    return this.http.put(`${this.url}/${this.formData.klijentId}`,this.formData);
  }
  deleteClient(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
