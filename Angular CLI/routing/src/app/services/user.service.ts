import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyConfig } from '../my-config';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[]=[];
  constructor(private http:HttpClient) { }

  readonly url = MyConfig.adresaServera + '/korisnik';

  formData:User = new User();
  get(){
    return this.http.get(this.url).toPromise().then(res => { this.users = res as User[] });
  }
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }
  postUsers(): Observable<User>{
    return this.http.post<User>(this.url,this.formData);
  }
  putUsers(): Observable<User>{
    return this.http.put<User>(`${this.url}/${this.formData.korisnikId}`,this.formData);
  }
  deleteUsers(id:number): Observable<User>{
    return this.http.delete<User>(`${this.url}/${id}`);
  }
 //za registraciju
 addKorisnik(korisnik: User) {
    
  return this.http.post<any>(this.url, korisnik);
}
}
