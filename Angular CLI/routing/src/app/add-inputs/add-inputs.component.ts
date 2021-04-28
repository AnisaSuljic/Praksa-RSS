import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IRacun } from '../models/racun.model';
import { RacunService } from '../services/racun.service';

@Component({
  selector: 'app-add-inputs',
  templateUrl: './add-inputs.component.html',
  styleUrls: ['./add-inputs.component.css']
})
export class AddInputsComponent implements OnInit {
  racuni: IRacun;
  constructor(private _racunService: RacunService) {
     this.racuni = new IRacun();
    }
  ngOnInit(): void {
  }
  onSubmit(){
    this._racunService.addRacun(this.racuni).subscribe(data=> this.racuni = data);
  }
  
}