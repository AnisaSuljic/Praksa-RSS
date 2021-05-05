import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manufacturer } from '../models/manufacturer.model';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  manufacturers: Manufacturer[]=[];
  constructor(private http:HttpClient) { }

  readonly url = 'http://rsspraksa-api.ml/Proizvodjac';
  formData:Manufacturer = new Manufacturer();
  get(){
    return this.http.get(this.url).toPromise().then(res => { this.manufacturers = res as Manufacturer[] });
  }
  getProizvodjac(){
    return this.http.get<Manufacturer[]>(this.url);
  }
  post(){
    return this.http.post(this.url,this.formData);
  }
  put(){
    return this.http.put(`${this.url}/${this.formData.proizvodjacId}`,this.formData);
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
