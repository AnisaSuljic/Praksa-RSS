import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { delay, map } from 'rxjs/operators';
import { IKlijent } from '../models/registracija.model';
import { User } from '../models/user.model';
import { ClientService } from '../services/client.service';
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
    this.klijent.potvrdjenMail = false;
    this._registracijaService.addKlijent(this.klijent).pipe(map(val => {this.klijent = val; this.korisnik.klijentId = this.klijent.klijentId; this.korisnik.isAdmin=true;} ))
          .subscribe( (data)=> 
          { this._korisnikService.addKorisnik(this.korisnik).subscribe( (result)=>{ this.IsReistrovan=true; });
    });

  }
}
