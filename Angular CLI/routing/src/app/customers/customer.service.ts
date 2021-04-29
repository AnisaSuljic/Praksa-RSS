import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers: Customer[]=[];

  constructor(private http:HttpClient) { }

  readonly url = 'http://rsspraksa-api.ml/Kupac';
  formData:Customer = new Customer();

  get(){
    return this.http.get(this.url).toPromise().then(res => { this.customers = res as Customer[] });
  }
  post(){
    return this.http.post(this.url,this.formData);
  }
  put(){
    return this.http.put(`${this.url}/${this.formData.kupacId}`,this.formData);
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
