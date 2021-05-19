import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { IArtikl } from '../models/artikl.model';
import { IJedinicaMjere } from '../models/jedinicamjere.model';
import { IRacun } from '../models/racun.model';
import { IStavka } from '../models/stavka.model';
import { ArtiklService } from '../services/artikl.service';
import { JedinicamjereService } from '../services/jedinicamjere.service';
import { RacunService } from '../services/racun.service';
import { StavkaService } from '../services/stavka.service';

@Component({
  selector: 'app-edit-stavka',
  templateUrl: './edit-stavka.component.html',
  styleUrls: ['../edit-outputs/edit-outputs.component.css']
})
export class EditStavkaComponent implements OnInit {
  closeResult:string='';
  stavkaZaEdit!: IStavka;
  stavkaZaProvjerit!: IStavka;
  artiklID: number = 0;
  private routeSub!: Subscription;
  id: number = 0;
  artikl: any;
  public artikli : IArtikl[] = [];
  public jediniceMjere: IJedinicaMjere[] = [];

  updateRac!:IRacun;

  _routerSub = Subscription.EMPTY;
  ifsubmit: boolean = true;

  cijenaPrijeIzmjena:number=0;

  constructor(
    private modalService: NgbModal,
    private _stavkaService: StavkaService,
    private router: Router,
    private route: ActivatedRoute,
    private _artiklService: ArtiklService,
    private _jediniceMjereService: JedinicamjereService,
    private _racunService:RacunService) 
    { 
    this.artikl = null;   

    this._routerSub = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationStart) {
        if (this.ifsubmit) {
          if (this.canDeactivate()) {
            router.navigateByUrl(router.url, { replaceUrl: true });
          } else {
          }
        }
      }
    });
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
        this.stavkaZaProvjerit = Object.assign({}, this.stavkaZaEdit);
      });
      this.cijenaPrijeIzmjena=this.stavkaZaEdit.cijenaBezPdv;
      console.log("cijena prije"+this.cijenaPrijeIzmjena);
    });
  }
  ngOnDestroy() {
    this._routerSub.unsubscribe();
  }
  canDeactivate(): boolean {
    console.log(this.stavkaZaEdit);
    console.log(this.stavkaZaProvjerit);
    if(JSON.stringify(this.stavkaZaEdit) !== JSON.stringify(this.stavkaZaProvjerit)){
      if (confirm("You have unsaved changes! If you leave, your changes will be lost.")) {
        return false;
      } else {
        return true;
      }
    }else {
      return false;
    }
  }
  @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
      if(this.canDeactivate()){
        return false; // ako ima promjena returning false otvara dialog
      }return true; // ako nema promjena refresha
    }
  OtkaziIzmjene(){
    window.location.reload();
  }
  cijenaCalc():number{
    this.stavkaZaEdit.cijenaBezPdv=this.stavkaZaEdit.kolicina*this.stavkaZaEdit.ulaznaCijena;
    this.stavkaZaProvjerit = Object.assign({}, this.stavkaZaEdit);
    return this.stavkaZaEdit.cijenaBezPdv;
  }
  pdvEditIzracun(){
    this.updateRac.iznosSaPdv=(this.updateRac.iznosRacuna)+(this.updateRac.iznosRacuna*(this.updateRac.iznosPoreza/100));
  }
  getArtiklById(id: any){
    console.log(id);
    this._artiklService.getArtiklById(id).subscribe(data => this.artikl = data);
    this.modalService.dismissAll();
  }
  EditStavka(id: any){
    this.ifsubmit = false;
    this.stavkaZaEdit.artiklId = this.artikl.artiklId;
    this.stavkaZaEdit.nazivArtikla = this.artikl.naziv;
    this.stavkaZaEdit.sifraArtikla = this.artikl.sifra;
    this.stavkaZaEdit.vpc = this.artikl.vpc;
    this.stavkaZaEdit.mpc = this.artikl.mpc;

    console.log(this.stavkaZaEdit);
    this._stavkaService.updateStavka(id,this.stavkaZaEdit).subscribe(data => this.stavkaZaEdit = data);
    let idRacuna = this.stavkaZaEdit.racunId;
    setTimeout(() =>{
      this._racunService.getRacunById(idRacuna).subscribe(res=>
        {this.updateRac=res;          
          this.updateRac.iznosRacuna-=this.cijenaPrijeIzmjena;
          console.log("iznos racuna prije "+this.updateRac.iznosRacuna);

          this.updateRac.iznosRacuna+=this.stavkaZaEdit.cijenaBezPdv;
          console.log("iznos racuna poslije "+this.updateRac.iznosRacuna);
          this.pdvEditIzracun();
          this._racunService.updateRacun(idRacuna,this.updateRac).subscribe(data => this.updateRac = data);
          if(this.updateRac.skladisteIzlazId==null)
          {
            this.router.navigate([`/adminpanel/editInputs/${idRacuna}`]).then(()=> {
              window.location.reload();
            });
          }
          else{
            this.router.navigate([`/adminpanel/editOutputs/${idRacuna}`]).then(()=> {
              window.location.reload();
            });
          }
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
