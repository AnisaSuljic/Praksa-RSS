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
  vrstaPlacanja: VrstaPlacanja[] = [];
  valuta: Valuta[] = [];
  uspjesnoDodavanje:boolean=false;
  SkladisteId:number=0;

  constructor(private _racunService: RacunService,private router: Router, private _skladisteService:SkladisteService,
    private _vrstaPlacanja:VrstaplacanjaService,private _valutaService:ValutaService) {
     this.racuni = new IRacun();

    }

  ngOnInit(): void {
    this._skladisteService.getSkladiste().subscribe(data => this.skladista = data);
    this._vrstaPlacanja.getVrsta().subscribe(data => this.vrstaPlacanja = data);
    this._valutaService.getValuta().subscribe(data => this.valuta = data);
  }
  
  onSubmit(){
    return this._racunService.addRacun(this.racuni).subscribe(
      (result)=>{
        this.router.navigate(["/adminpanel/inputs"]);
        this.uspjesnoDodavanje=true;
      }
    );
  }

  Zatvori(){
    this.router.navigate(["/adminpanel/inputs"]);
  }
  
}