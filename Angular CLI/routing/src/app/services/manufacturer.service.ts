import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyConfig } from '../my-config';
import { Manufacturer } from '../models/manufacturer.model';
import { ClientService } from './client.service';
import { Client } from '../models/client.model';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  manufacturers: Manufacturer[]=[];
  constructor(private http:HttpClient, public clientService:ClientService) { }
  client!:Client;

  readonly url:string = MyConfig.adresaServera + '/proizvodjac';
  formData:Manufacturer = new Manufacturer();
  get(){
    return this.http.get(this.url).toPromise().then(res => { 
      this.manufacturers = res as Manufacturer[];
    });
  }
  getManufacturers():Observable<Manufacturer[]>{
    return this.http.get<Manufacturer[]>(this.url);
  }
  postManufacturer():Observable<Manufacturer>{
    return this.http.post<Manufacturer>(this.url,this.formData);
  }
  putManufacturer():Observable<Manufacturer>{
    return this.http.put<Manufacturer>(`${this.url}/${this.formData.proizvodjacId}`,this.formData);
  }
  deleteManufacturer(id:number):Observable<Manufacturer>{
    return this.http.delete<Manufacturer>(`${this.url}/${id}`);
  }
}
