import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyConfig } from '../my-config';
import { Manufacturer } from '../models/manufacturer.model';
import { ClientService } from './client.service';
import { Client } from '../models/client.model';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  manufacturers: Manufacturer[]=[];
  client!:Client;
  readonly url:string = MyConfig.adresaServera + '/proizvodjac';
  formData:Manufacturer = new Manufacturer();
  currUser?: User;
  constructor(private http:HttpClient, public clientService:ClientService) { 
    this.currUser = JSON.parse(localStorage.getItem('currentUser')!);
  }
  get(){
    return this.http.get(this.url).toPromise().then(res => { 
      const manufactureri = res as Manufacturer[];
      const currUser:User = JSON.parse(localStorage.getItem('currentUser')!);
      this.manufacturers = manufactureri.filter(obj => obj.klijentId == currUser.klijentId);
      for(let i=0; i< this.manufacturers.length;i++){
        this.clientService.getClientById(this.manufacturers[i].klijentId).subscribe(data=>
            this.manufacturers[i].klijentNaziv = data.naziv)
      }
    });
  }
  getManufacturers():Observable<Manufacturer[]>{
    return this.http.get<Manufacturer[]>(this.url);
  }
  postManufacturer(item: Manufacturer):Observable<Manufacturer>{
    item.klijentId = this.currUser?.klijentId;
    return this.http.post<Manufacturer>(this.url,item);
  }
  putManufacturer(id: number, item: Manufacturer):Observable<Manufacturer>{
    this.formData.klijentId = this.currUser?.klijentId;
    return this.http.put<Manufacturer>(`${this.url}/${id}`,item);
  }
  deleteManufacturer(id:number):Observable<Manufacturer>{
    return this.http.delete<Manufacturer>(`${this.url}/${id}`);
  }
}
