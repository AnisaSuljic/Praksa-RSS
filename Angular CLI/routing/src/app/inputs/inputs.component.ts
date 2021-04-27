import { Component, OnInit } from '@angular/core';
import { IRacun } from '../racun';
import { RacunService } from '../racun.service';

@Component({
  selector: 'app-inputs',
  templateUrl:'/inputs.component.html',
  styleUrls:['/inputs.component.css']
})
export class InputsComponent implements OnInit {
  public racuni : IRacun[] = [];
  public racunPost: IRacun | undefined;
  constructor(private _racunService: RacunService) { }

  ngOnInit(): void {
    this._racunService.getRacuni()
        .subscribe(data => this.racuni = data);
  }
  addRacun(){
    this._racunService.addRacun(this.racunPost).subscribe(data => this.racunPost = data);
  }
}
