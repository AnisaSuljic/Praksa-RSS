import { Component, OnInit } from '@angular/core';
import { IRacun } from '../models/racun.model';
import { RacunService } from '../services/racun.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';
import { IStavka } from '../models/stavka.model';
import { StavkaService } from '../services/stavka.service';



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
     private _stavkaService: StavkaService) { }

  ngOnInit(): void {
    this._racunService.getRacuni()
        .subscribe(data => this.racuni = data);
    this._stavkaService.getStavke()
        .subscribe(data => this.stavkeBaza = data);
  }

  DeleteRacun() {
    this._racunService.deleteRacun(this.idRacuna)
    .subscribe(data => this.racun = data);
    return this._racunService.getRacuni()
    .subscribe(
      (result)=>{
        this.ngOnInit();
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
