import { Component, OnInit } from '@angular/core';
import { IRacun } from '../models/racun.model';
import { RacunService } from '../services/racun.service';

@Component({
  selector: 'app-inputs',
  templateUrl:'/inputs.component.html',
  styleUrls:['/inputs.component.css']
})
export class InputsComponent implements OnInit {
  public racuni : IRacun[] = [];
  constructor(private _racunService: RacunService) { }

  ngOnInit(): void {
    this._racunService.getRacuni()
        .subscribe(data => this.racuni = data);
  }
  
}
