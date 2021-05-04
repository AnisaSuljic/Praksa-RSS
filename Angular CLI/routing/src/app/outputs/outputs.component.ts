import { Component, OnInit } from '@angular/core';
import { IRacun } from '../models/racun.model';
import { RacunService } from '../services/racun.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';
import { IStavka } from '../models/stavka.model';
import { StavkaService } from '../services/stavka.service';
import { ValutaService } from '../services/valuta.service';
import { SkladisteService } from '../services/skladiste.service';
import { ArtiklService } from '../services/artikl.service';



@Component({
  selector: 'app-outputs',
  templateUrl:'/outputs.component.html',
  styleUrls:['/outputs.component.css']
})
export class OutputsComponent implements OnInit {
  public racuni : IRacun[] = [];
  closeResult:string='';
  racun!: IRacun;
  idRacuna:number=0;
  public stavkeBaza : IStavka[] = [];

  constructor(private _racunService: RacunService,
    private modalService: NgbModal,
     private _stavkaService: StavkaService,
     private _valuteService: ValutaService,
     private _skladisteService: SkladisteService,
     private _artiklService: ArtiklService) { }

  ngOnInit(): void {
    this._racunService.getRacuni().subscribe(data => {
          console.log(data);
          for (let i = 0; i < data.length; i++){
            this.racuni.push(data[i]);
            if(this.racuni[i].skladisteIzlazId != null){
              this._skladisteService.getSkladisteById(this.racuni[i].skladisteIzlazId).subscribe(l=>{
                this.racuni[i].nazivSkladista = l.naziv;
              });
            }
          }
        });
        this._stavkaService.getStavke().subscribe(data => {
          for(let i = 0; i < data.length; i++){
            this.stavkeBaza.push(data[i]);
            this._artiklService.getArtiklById(this.stavkeBaza[i].artiklId).subscribe(l => {
              this.stavkeBaza[i].nazivArtikla = l.naziv;
            });
            this._artiklService.getArtiklById(this.stavkeBaza[i].artiklId).subscribe(l => {
              this.stavkeBaza[i].sifraArtikla = l.sifra;
            });
            this._artiklService.getArtiklById(this.stavkeBaza[i].artiklId).subscribe(l => {
              this.stavkeBaza[i].vpc = l.vpc;
            });
            this._artiklService.getArtiklById(this.stavkeBaza[i].artiklId).subscribe(l => {
              this.stavkeBaza[i].mpc = l.mpc;
            });
            this._artiklService.getArtiklById(this.stavkeBaza[i].artiklId).subscribe(l => {
              this.stavkeBaza[i].jedMjere = l.jedinicaMjereId;
            });
          }
        });
  }

  DeleteRacun() {
    this._racunService.deleteRacun(this.idRacuna).subscribe(data => this.racun = data);
    return this._racunService.getRacuni().subscribe(
      (result)=>{
        window.location.reload();
        this.modalService.dismissAll();
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
