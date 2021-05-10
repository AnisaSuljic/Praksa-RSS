import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/internal/Subscription';
import { IArtikl } from '../models/artikl.model';
import { IJedinicaMjere } from '../models/jedinicamjere.model';
import { IStavka } from '../models/stavka.model';
import { ArtiklService } from '../services/artikl.service';
import { JedinicamjereService } from '../services/jedinicamjere.service';
import { StavkaService } from '../services/stavka.service';

@Component({
  selector: 'app-edit-stavka',
  templateUrl: './edit-stavka.component.html',
  styleUrls: ['../edit-outputs/edit-outputs.component.css']
})
export class EditStavkaComponent implements OnInit {
  closeResult:string='';
  stavkaZaEdit!: IStavka;
  artiklID: number = 0;
  private routeSub!: Subscription;
  id: number = 0;
  artikl: any;
  public artikli : IArtikl[] = [];
  public jediniceMjere: IJedinicaMjere[] = [];
  constructor(
    private modalService: NgbModal,
    private _stavkaService: StavkaService,
    private router: Router,
    private route: ActivatedRoute,
    private _artiklService: ArtiklService,
    private _jediniceMjereService: JedinicamjereService
    ) { 
    this.artikl = null; 
   }

  ngOnInit(): void {
    this.modalService.dismissAll();
    this.routeSub = this.route.params.subscribe(params => {
      this.id=params['id'] //log the value of id
    });
    this._artiklService.getArtikli()
        .subscribe(data => this.artikli = data);
    this._jediniceMjereService.getJedinicaMjere().subscribe(data => this.jediniceMjere = data);
    this._stavkaService.getStavkaById(this.id).subscribe(data =>  {
      this.stavkaZaEdit = data;
      this._artiklService.getArtiklById(this.stavkaZaEdit.artiklId).subscribe(l => {
        this.artikl = l;
        this.stavkaZaEdit.nazivArtikla = l.naziv;
        this.stavkaZaEdit.mpc = l.mpc;
        this.stavkaZaEdit.sifraArtikla = l.sifra;
        this.stavkaZaEdit.vpc = l.vpc;
      });

    });
  }
  getArtiklById(id: any){
    console.log(id);
    this._artiklService.getArtiklById(id).subscribe(data => this.artikl = data);
    this.modalService.dismissAll();
  }
  EditStavka(id: any){
    this.stavkaZaEdit.artiklId = this.artikl.artiklId;
    this.stavkaZaEdit.nazivArtikla = this.artikl.naziv;
    this.stavkaZaEdit.sifraArtikla = this.artikl.sifra;
    this.stavkaZaEdit.vpc = this.artikl.vpc;
    this.stavkaZaEdit.mpc = this.artikl.mpc;

    console.log(this.stavkaZaEdit);
    this._stavkaService.updateStavka(id,this.stavkaZaEdit).subscribe(data => this.stavkaZaEdit = data);
    let idRacuna = this.stavkaZaEdit.racunId;
    setTimeout(() =>{
      this.router.navigate([`/adminpanel/editOutputs/${idRacuna}`]).then(()=> {
        window.location.reload();
      });
    },1000);
    
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
