import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyConfig } from '../my-config';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];
  readonly url = MyConfig.adresaServera + '/korisnik';
  formData: User = new User();
  currUser!: User;
  constructor(private http: HttpClient) {
  }
  ucitaj() {
    let rep: string = localStorage.getItem('token')!;
    let korisnickoIme: string = window.atob(rep).split(':', 1) as unknown as string;
    this.http.get(this.url).toPromise().then(res => {
      const useri: User[] = res as User[];
      this.users = useri.filter(obj => obj.korisnickoIme == korisnickoIme);
      this.currUser = this.users[0];
    });
  }
  ucitajKorisnika(){
    let rep: string = localStorage.getItem('token')!;
    let korisnickoIme: string = window.atob(rep).split(':', 1) as unknown as string;
    return this.http.get(this.url).pipe(map( res => {
      const useri: User[] = res as User[];
      this.users = useri.filter(obj => obj.korisnickoIme == korisnickoIme);
      this.currUser = this.users[0];
    }));
  }
  get() {
    return this.http.get(this.url).toPromise().then(res => {
      const useri: User[] = res as User[];
      const currUser: User = this.currUser;
      this.users = useri.filter(obj => obj.klijentId == currUser.klijentId);
    });
  }
  getPoImePrezime(pretraga: string) {
    return this.http.get(this.url).toPromise().then(res => {
      const useri: User[] = res as User[];
      const currUser: User = this.currUser;
      this.users = useri.filter(obj => obj.klijentId == currUser.klijentId);
      this.users = this.users.filter(obj => obj.ime?.includes(pretraga) || obj.prezime?.includes(pretraga));
    });
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
  getUserById(id: number): Observable<User> {
    const _url = `${this.url}/${id}`;
    return this.http.get<User>(_url);
  }
  postUsers(): Observable<User> {
    this.formData.klijentId = this.currUser?.klijentId;
    this.formData.isAdmin = false;
    return this.http.post<User>(this.url, this.formData);
  }
  putUsers(): Observable<User> {
    return this.http.put<User>(`${this.url}/${this.formData.korisnikId}`, this.formData);
  }
  deleteUsers(id: number): Observable<User> {
    return this.http.delete<User>(`${this.url}/${id}`);
  }
  //za registraciju
  addKorisnik(korisnik: User) {
    korisnik.isAdmin = true;
    return this.http.post<any>(this.url, korisnik);
  }
}
