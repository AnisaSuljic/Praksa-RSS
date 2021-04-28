import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { IArtikl } from '../models/artikl.model';
import { IRacun } from '../models/racun.model';
import { ArtiklService } from '../services/artikl.service';
import { RacunService } from '../services/racun.service';

@Component({
  selector: 'app-edit-inputs',
  templateUrl: './edit-inputs.component.html',
  styleUrls: ['./edit-inputs.component.css']
})
export class EditInputsComponent implements OnInit {
  closeResult:string='';
  id:number = 0;
  racun!: IRacun;
  artikl!: IArtikl;
  public artikli : IArtikl[] = [];
  private routeSub!: Subscription;
  constructor(private _racunService: RacunService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private _artiklService: ArtiklService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id=params['id'] //log the value of id
    });
    this._racunService.getRacunById(this.id).subscribe(data => this.racun = data);
    this._artiklService.getArtikli()
        .subscribe(data => this.artikli = data);
  }
  getArtiklById(target: any){
    for(var item of this.artikli){
      if(item.naziv == (target as HTMLSelectElement).value) {
        this._artiklService.getArtiklById(item.artiklId).subscribe(data => this.artikl = data);
      }
    }
  }
  updateRacun(){
    this._racunService.updateRacun(this.racun.racunId,this.racun).subscribe(data => this.racun = data);
  }
  ToSection(id:string){
    document.getElementById(id)?.scrollIntoView();
  }
  /**Modal GetStavke */
Get(content:any) {
  this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title',size:'lg'}).result.then((result) => {
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
