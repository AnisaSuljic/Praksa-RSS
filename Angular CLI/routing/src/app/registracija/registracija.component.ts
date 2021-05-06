import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { IKlijent } from '../models/registracija.model';
import { User } from '../models/user.model';
import { RegistracijaService } from '../services/registracija.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registracija',
  templateUrl:'./registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {
  klijent: IKlijent;
  korisnik:User;
  IsReistrovan:boolean=false;

  constructor(private _registracijaService: RegistracijaService,private router: Router,private _korisnikService: UserService) 
  {
    this.klijent=new IKlijent();
    this.korisnik=new User();
  }
  ngOnInit(): void {
  }
  onSubmit(){
        
    this._registracijaService.addKlijent(this.klijent).subscribe(data=>this.klijent=data);

    console.log(this.klijent);
    console.log(this.korisnik);
    this.korisnik.klijentId=this.klijent.klijentId;
    this.korisnik.isAdmin=true;
    return this._korisnikService.addKorisnik(this.korisnik).subscribe(
    (result)=>{
      this.IsReistrovan=true;
    });
  }
}
