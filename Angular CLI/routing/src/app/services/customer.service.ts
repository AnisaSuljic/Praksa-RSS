import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyConfig } from '../my-config';
import { Customer } from '../models/customer.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { GradService } from './grad.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers: Customer[]=[];
  readonly url:string = MyConfig.adresaServera + '/kupac';
  formData:Customer = new Customer();
  currUser!: User;
  
  constructor(private http:HttpClient, private _gradService: GradService, private _korisnikService:UserService) {
    this._korisnikService.ucitajKorisnika().subscribe(res=> {
      this.currUser = this._korisnikService.currUser;
    });
   }

  get(){
    return this.http.get(this.url).toPromise().then(res => { 
      const customeri = res as Customer[];
      //const currUser:User = JSON.parse(localStorage.getItem('currentUser')!);
      this.customers = customeri.filter(obj => obj.klijentId == this.currUser.klijentId);
      for(let i=0; i< this.customers.length;i++){
        this._gradService.getGradById(this.customers[i].gradId!).subscribe(data=>
            this.customers[i].gradNaziv = data.naziv)
      }
    });
  }
  getCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.url);
  }
  postCustomer(): Observable<Customer>{
    this.formData.klijentId = this.currUser?.klijentId;
    return this.http.post<Customer>(this.url,this.formData);
  }
  putCustomer(): Observable<Customer>{
    return this.http.put<Customer>(`${this.url}/${this.formData.kupacId}`,this.formData);
  }
  deleteCustomer(id:number): Observable<Customer>{
    return this.http.delete<Customer>(`${this.url}/${id}`);
  }
}
