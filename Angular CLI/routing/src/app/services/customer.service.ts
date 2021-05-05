import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyConfig } from '../my-config';
import { Customer } from '../models/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers: Customer[]=[];

  constructor(private http:HttpClient) { }

  readonly url:string = MyConfig.adresaServera + '/kupac';
  formData:Customer = new Customer();

  get(){
    return this.http.get(this.url).toPromise().then(res => { this.customers = res as Customer[] });
  }
  getCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.url);
  }
  postCustomer(): Observable<Customer>{
    return this.http.post<Customer>(this.url,this.formData);
  }
  putCustomer(): Observable<Customer>{
    return this.http.put<Customer>(`${this.url}/${this.formData.kupacId}`,this.formData);
  }
  deleteCustomer(id:number): Observable<Customer>{
    return this.http.delete<Customer>(`${this.url}/${id}`);
  }
}
