import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IRacun } from '../models/racun.model';
import { RacunService } from '../services/racun.service';

@Component({
  selector: 'app-add-inputs',
  templateUrl: './add-inputs.component.html',
  styleUrls: ['./add-inputs.component.css']
})
export class AddInputsComponent implements OnInit {
  racuni: IRacun;

  constructor(private _racunService: RacunService,private router: Router) {
     this.racuni = new IRacun();
    }

  ngOnInit(): void {
  }
  
  onSubmit(){
    return this._racunService.addRacun(this.racuni).subscribe(
      (result)=>{
        this.router.navigate(["/adminpanel/inputs"]);
      }
    );
  }

  Zatvori(){
    this.router.navigate(["/adminpanel/inputs"]);
  }
  
}