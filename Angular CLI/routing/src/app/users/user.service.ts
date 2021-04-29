import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[]=[];
  constructor(private http:HttpClient) { }
  readonly url = 'http://rsspraksa-api.ml/Korisnik';
  formData:User = new User();
  getUsers(){
    return this.http.get(this.url).toPromise().then(res => { this.users = res as User[] });
  }
  postUsers(){
    return this.http.post(this.url,this.formData);
  }
  putUsers(){
    return this.http.put(`${this.url}/${this.formData.korisnikId}`,this.formData);
  }
  deleteUsers(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

}
