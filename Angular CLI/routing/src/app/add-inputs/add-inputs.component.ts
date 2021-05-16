import { getLocaleDateTimeFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IRacun } from '../models/racun.model';
import { Skladiste } from '../models/skladiste.model';
import { Valuta } from '../models/valuta.model';
import { VrstaPlacanja } from '../models/vrstaplacanja.model';
import { RacunService } from '../services/racun.service';
import { SkladisteService } from '../services/skladiste.service';
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
  uspjesnoDodavanje:boolean=false;
  SkladisteId:number=0;
  iznosPDV:number=0;
  iznosracun:number=0;
  pdv:number=0;
  
  BrojRacuna:string='';
  datum1:Date;

  constructor(private _racunService: RacunService,private router: Router, private _skladisteService:SkladisteService,
    private _vrstaPlacanja:VrstaplacanjaService,private _valutaService:ValutaService) {
     this.racuni = new IRacun();
    this.datum1=new Date();
    this.iznosPDV=0;
    this.iznosracun=0;
    this.pdv=0;
    }

  ngOnInit(): void {
    this._skladisteService.getSkladiste().subscribe(data => this.skladista = data);
    this._vrstaPlacanja.getVrsta().subscribe(data => this.vrstaPlacanja = data);
    this._valutaService.getValuta().subscribe(data => this.valuta = data);
    this._racunService.getRacuni().subscribe(data => {
      for(let i = 0; i < data.length; i++){
        this.racuniLista.push(data[i])
      }
      this.racuni.brojRacuna= "2021/br"+(this.racuniLista.length + 1).toString();

    })
  }
  
  onSubmit(){
    this.racuni.iznosRacuna=this.iznosracun;
    this.racuni.iznosPoreza=this.pdv;
    this.racuni.iznosSaPdv=this.iznosPDV;

    return this._racunService.addRacun(this.racuni).subscribe(
      (result)=>{
        this.router.navigate(["/adminpanel/inputs"]);
        this.uspjesnoDodavanje=true;
      }
    );
  }

  pdvIzracun(){
    this.iznosPDV=(this.iznosracun)+(this.iznosracun*(this.pdv/100));
  }

  Zatvori(){
    this.router.navigate(["/adminpanel/inputs"]);
  }
  
}