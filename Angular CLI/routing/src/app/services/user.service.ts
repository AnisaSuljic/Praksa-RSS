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
  users1: User[]=[];
  readonly url = MyConfig.adresaServera + '/korisnik';
  formData:User = new User();
  currUser?: User;
  constructor(private http:HttpClient) {
    this.currUser = JSON.parse(localStorage.getItem('currentUser')!);
   }

  get(){
    return this.http.get(this.url).toPromise().then(res => { 
      const useri:User[] = res as User[];
      const currUser:User = JSON.parse(localStorage.getItem('currentUser')!);
      this.users = useri.filter(obj => obj.klijentId == currUser.klijentId);
    });
  }
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }
  getUserById(id: number): Observable<User>{
    const _url = `${this.url}/${id}`;
    return this.http.get<User>(_url);
  }
  postUsers(): Observable<User>{
    this.formData.klijentId = this.currUser?.klijentId;
    this.formData.isAdmin = false;
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
   korisnik.isAdmin = true;
  return this.http.post<any>(this.url, korisnik);
}
}
