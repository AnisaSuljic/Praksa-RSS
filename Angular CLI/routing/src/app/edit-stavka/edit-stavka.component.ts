import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/internal/Subscription';
import { IArtikl } from '../models/artikl.model';
import { IStavka } from '../models/stavka.model';
import { ArtiklService } from '../services/artikl.service';
import { StavkaService } from '../services/stavka.service';

@Component({
  selector: 'app-edit-stavka',
  templateUrl: './edit-stavka.component.html',
  styleUrls: ['../edit-outputs/edit-outputs.component.css']
})
export class EditStavkaComponent implements OnInit {
  closeResult:string='';
  stavkaZaEdit: any;
  artiklID: number = 0;
  private routeSub!: Subscription;
  id: number = 0;
  artikl: any;
  public artikli : IArtikl[] = [];
  constructor(
    private modalService: NgbModal,
    private _stavkaService: StavkaService,
    private router: Router,
    private route: ActivatedRoute,
    private _artiklService: ArtiklService
    ) { 
    this.artikl = null; 
   }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id=params['id'] //log the value of id
    });
    this._artiklService.getArtikli()
        .subscribe(data => this.artikli = data);

        

    this._stavkaService.getStavkaById(this.id).subscribe(data =>  {
      console.log(data);
    });




    this._artiklService.getArtiklById(this.stavkaZaEdit.artiklId).subscribe(l => {
      this.stavkaZaEdit.nazivArtikla = l.naziv;
    });
    this._artiklService.getArtiklById(this.stavkaZaEdit.artiklId).subscribe(l => {
      this.stavkaZaEdit.sifraArtikla = l.sifra;
    });
    this._artiklService.getArtiklById(this.stavkaZaEdit.artiklId).subscribe(l => {
      this.stavkaZaEdit.vpc = l.vpc;
    });
    this._artiklService.getArtiklById(this.stavkaZaEdit.artiklId).subscribe(l => {
      this.stavkaZaEdit.mpc = l.mpc;
    });
  }
  getArtiklById(id: any){
    console.log(id);
    this._artiklService.getArtiklById(id).subscribe(data => this.artikl = data);
    this.modalService.dismissAll();
  }
  EditStavka(id: any){
    this._stavkaService.updateStavka(id,this.stavkaZaEdit).subscribe(data => this.stavkaZaEdit = data);
    window.location.reload();
    this.modalService.dismissAll();
  }
  Get(content:any) {
    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
