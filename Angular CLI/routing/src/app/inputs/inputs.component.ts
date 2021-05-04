import { Component, OnInit } from '@angular/core';
import { IRacun } from '../models/racun.model';
import { RacunService } from '../services/racun.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';
import { IStavka } from '../models/stavka.model';
import { StavkaService } from '../services/stavka.service';
import { ArtiklService } from '../services/artikl.service';
import { IArtikl } from '../models/artikl.model';
import { SkladisteService } from '../services/skladiste.service';



@Component({
  selector: 'app-inputs',
  templateUrl:'/inputs.component.html',
  styleUrls:['/inputs.component.css']
})
export class InputsComponent implements OnInit {
  public racuni : IRacun[] = [];
  closeResult:string='';
  racun!: IRacun;
  idRacuna:number=0;
  public stavkeBaza : IStavka[] = [];
  brisanje:boolean=false;
  public dodavanje:boolean=false;
  public artikli : IArtikl[] = [];


  constructor(private _racunService: RacunService,
    private modalService: NgbModal,
    private _stavkaService: StavkaService,
    private _artiklService:ArtiklService,
    private _skladisteService: SkladisteService) { }

  ngOnInit(): void {
    this._racunService.getRacuni()
        .subscribe(data => {
          console.log(data);
          for (let i = 0; i < data.length; i++){
            this.racuni.push(data[i])
            this._skladisteService.getSkladisteById(this.racuni[i].skladisteUlazId).subscribe(l=>{
              this.racuni[i].nazivSkladista = l.naziv
            })
          }
        });
    this._stavkaService.getStavke()
        .subscribe(data => this.stavkeBaza = data);
    this._artiklService.getArtikli()
        .subscribe(data => this.artikli = data);
        
  }

  DeleteRacun() {
    return this._racunService.deleteRacun(this.idRacuna)
    .subscribe(
      (result)=>{
        this.ngOnInit();
        this.modalService.dismissAll();
        this.brisanje=true;
      }
    );
  }


  /**Modal GetItems */
Get(content:any,id: any) {
  this.idRacuna = id;
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:'lg'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
/**Modal Delete */

Delete(content2:any,item:IRacun) {
  console.log(item.racunId);
  this.idRacuna=item.racunId;
  this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
}
