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
  selector: 'app-add-outputs',
  templateUrl: './add-outputs.component.html',
  styleUrls: ['./add-outputs.component.css']
})
export class AddOutputsComponent implements OnInit {

  racuni: IRacun;
  skladista: Skladiste[] = [];
  vrsteplacanja: VrstaPlacanja[] = [];
  valute: Valuta[] = [];

  constructor(private _racunService: RacunService,
    private _skladisteService: SkladisteService,
     private router: Router,
     private _vrstaPlacanja: VrstaplacanjaService,
     private _valuteService: ValutaService) {
     this.racuni = new IRacun();
    }
  ngOnInit(): void {
    this._skladisteService.getSkladiste().subscribe(data => this.skladista = data);
    this._vrstaPlacanja.getVrsta().subscribe(data => this.vrsteplacanja = data);
    this._valuteService.getValuta().subscribe(data => this.valute = data);
  }

  onSubmit(){
    this._racunService.addRacun(this.racuni).subscribe(data=> this.racuni = data);
    this.router.navigate(["/adminpanel/outputs"]);
  }

}
