import { getLocaleDateTimeFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { IRacun } from '../models/racun.model';
import { Skladiste } from '../models/skladiste.model';
import { User } from '../models/user.model';
import { Valuta } from '../models/valuta.model';
import { VrstaPlacanja } from '../models/vrstaplacanja.model';
import { RacunService } from '../services/racun.service';
import { SkladisteService } from '../services/skladiste.service';
import { UserService } from '../services/user.service';
import { ValutaService } from '../services/valuta.service';
import { VrstaplacanjaService } from '../services/vrstaplacanja.service';

@Component({
  selector: 'app-add-inputs',
  templateUrl: './add-inputs.component.html',
  styleUrls: ['./add-inputs.component.css']
})
export class AddInputsComponent implements OnInit {
  racuni: IRacun;
  skladista: Skladiste[] = [];
  racuniLista: IRacun[] = [];
  vrstaPlacanja: VrstaPlacanja[] = [];
  valuta: Valuta[] = [];
  SkladisteId:number=0;
  iznosPDV:number=0;
  iznosracun:number=0;
  pdv:number=0;
  
  TempRacun: IRacun;
  GetLenght:number=0;
  BrojRacuna:string='';
  datum1:Date;

  currUser!: User;

  ID:number=0;


  constructor(private _racunService: RacunService,private router: Router, private _skladisteService:SkladisteService,
    private _vrstaPlacanja:VrstaplacanjaService,private _valutaService:ValutaService,private _korisnikService:UserService) {
     this.racuni = new IRacun();
    this.TempRacun= new IRacun();

    this.datum1=new Date();
    this.iznosPDV=0;
    this.iznosracun=0;
    this.pdv=0;
    }

  ngOnInit(): void {
    //valuta se unosi kroz bazu direktno
    this._valutaService.getValuta().subscribe(data => this.valuta = data);
    this._vrstaPlacanja.getVrsta().subscribe(data => this.vrstaPlacanja=data);
    
    this._korisnikService.ucitajKorisnika().subscribe(res => {
      this.currUser = this._korisnikService.currUser;
      //skladista
      this._skladisteService.getSkladiste().subscribe(s => {
        for(let i = 0; i < s.length; i++)
        {
          if(s[i].klijentId==this.currUser.klijentId)
          {
            this.skladista.push(s[i])
          }
        }
      })
      //vrsta placanja->ovako bi trebalo izgledati ali se vrsta placanja unosi 
      //direktno u bazu i nema crud na GUI pa cu staviti bez filtera da ne bi bilo runtime errora
      
      /*
      this._vrstaPlacanja.getVrsta().subscribe(vp => {
        for(let i = 0; i < vp.length; i++)
        {
          if(vp[i].klijentId==this.currUser.klijentId)
          {
            this.vrstaPlacanja.push(vp[i])
          }
        }
      })

      */
      //racuni
    this._racunService.getRacuni().subscribe(data => {
      for(let i = 0; i < data.length; i++)
      {
        if(data[i].skladisteIzlazId==null && data[i].klijentId==this.currUser.klijentId)
        {
          this.racuniLista.push(data[i])
        }
      }
      this.racuni.brojRacuna= "2021/br"+(this.racuniLista.length+1).toString();            
    })
  })
  }
  
  onSubmit(){
    this.racuni.iznosRacuna=this.iznosracun;
    this.racuni.iznosPoreza=this.pdv;
    this.racuni.iznosSaPdv=this.iznosPDV;

    return this._racunService.addRacun(this.racuni).subscribe(data=>{this.TempRacun=data
      let idrac=this.TempRacun.racunId;
      this.router.navigate([`/adminpanel/editInputs/${idrac}`]);      
    });
      
  }

  pdvIzracun(){
    this.iznosPDV=this.iznosracun+this.pdv;
  }

  Zatvori(){
    this.router.navigate(["/adminpanel/inputs"]);
  }
  
}