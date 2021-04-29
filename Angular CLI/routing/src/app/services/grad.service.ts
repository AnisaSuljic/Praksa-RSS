import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grad } from '../models/grad.model';
@Injectable({
  providedIn: 'root'
})
export class GradService {
  private _url = 'https://localhost:44300/grad';
  grad: Grad[] = [];
  constructor(private http:HttpClient) { this.grad = []; }

  getGrad():Observable<Grad[]>{
    return this.http.get<Grad[]>(this._url);
  }
  addGrad(Porez: Grad) {
    return this.http.post<any>(this._url, Porez);
  }
  updateGrad(id: number, item: Grad){
    const url = `${this._url}/${id}`;
    return this.http.put<Grad>(url,item);
  }
  getGradById(id: number): Observable<Grad>{
    const url = `${this._url}/${id}`;
    return this.http.get<Grad>(url);
  }
  deleteGrad(id:number):Observable<Grad>{
    const url = `${this._url}/${id}`;
    return this.http.delete<Grad>(url);
  }

}