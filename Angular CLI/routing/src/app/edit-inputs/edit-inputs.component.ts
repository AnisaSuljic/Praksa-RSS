import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';
import { Subscription } from 'rxjs';
import { IArtikl } from '../models/artikl.model';
import { IJedinicaMjere } from '../models/jedinicamjere.model';
import { IRacun } from '../models/racun.model';
import { Skladiste } from '../models/skladiste.model';
import { IStavka } from '../models/stavka.model';
import { Valuta } from '../models/valuta.model';
import { VrstaPlacanja } from '../models/vrstaplacanja.model';
import { ArtiklService } from '../services/artikl.service';
import { JedinicamjereService } from '../services/jedinicamjere.service';
import { RacunService } from '../services/racun.service';
import { SkladisteService } from '../services/skladiste.service';
import { StavkaService } from '../services/stavka.service';
import { ValutaService } from '../services/valuta.service';
import { VrstaplacanjaService } from '../services/vrstaplacanja.service';

@Component({
  selector: 'app-edit-inputs',
  templateUrl: './edit-inputs.component.html',
  styleUrls: ['./edit-inputs.component.css']
})
export class EditInputsComponent implements OnInit {
  closeResult:string='';
  id:number = 0;
  racun!: IRacun;
  racunZaPoredit!: IRacun;
  artikl: any=null;
  stavka: IStavka = new IStavka();
  public artikli : IArtikl[] = [];
  private routeSub!: Subscription;

  skladista: Skladiste[] = [];
  vrstaPlacanja: VrstaPlacanja[] = [];
  valuta: Valuta[] = [];

  stavkeLista: IStavka[] = [];
  public stavkePrikaz : IStavka[] = [];
  public jedinicemjere: IJedinicaMjere[] = [];
  stavkaBrisanje: IStavka = new IStavka();
  stavkaBrisanjecijene: IStavka = new IStavka();
  datum2:Date;

  dodavanje:boolean=false;
  uredjivanje:boolean=false;

  _routerSub = Subscription.EMPTY;
  ifsubmit: boolean = true;

  constructor(private _racunService: RacunService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private _artiklService: ArtiklService,
    private _stavkaService: StavkaService,
    private router: Router,private _skladisteService:SkladisteService,
    private _vrstaPlacanja:VrstaplacanjaService,private _valutaService:ValutaService,
    private _jediniceMjereService:JedinicamjereService    ) { 
      this.artikl = null; 
      this.stavka = new IStavka();
      this.datum2=new Date();


      this.stavka.rabat=0;

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
    this.routeSub = this.route.params.subscribe(params => {
      this.id=params['id'] //log the value of id
    });

    this._racunService.getRacunById(this.id).subscribe(data =>{ this.racun = data
     console.log(this.racun); 
     this.racunZaPoredit = Object.assign({}, this.racun);
     
    });

    this._artiklService.getArtikli()
        .subscribe(data => this.artikli = data);
        
    this._skladisteService.getSkladiste().subscribe(data => this.skladista = data);
    this._vrstaPlacanja.getVrsta().subscribe(data => this.vrstaPlacanja = data);
    this._valutaService.getValuta().subscribe(data => this.valuta = data);  
    this._jediniceMjereService.getJedinicaMjere().subscribe(data => this.jedinicemjere = data);

    this._stavkaService.getStavke().subscribe(data => {
      for(let i = 0; i < data.length; i++){
        this.stavkeLista.push(data[i]);
        this._artiklService.getArtiklById(this.stavkeLista[i].artiklId).subscribe(l => {
          this.stavkeLista[i].nazivArtikla = l.naziv;
          this.stavkeLista[i].sifraArtikla = l.sifra;
          this.stavkeLista[i].vpc = l.vpc;
          this.stavkeLista[i].mpc = l.mpc;
          this.stavkeLista[i].jedMjere = l.jedinicaMjereId;
          this._jediniceMjereService.getJedinicaMjereById(l.jedinicaMjereId).subscribe(kl => {
            this.stavkeLista[i].jedMjereNaziv = kl.naziv;
          })
        });
      }
    });
    for(let item of this.stavkeLista){
      if(item.racunId == this.id){
        this.stavkePrikaz.push(item);
      }
    }
  }
  ngOnDestroy() {
    this._routerSub.unsubscribe();
  }
  canDeactivate(): boolean {
    if(JSON.stringify(this.racun) !== JSON.stringify(this.racunZaPoredit)){
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
  getArtiklById(id: any){
    this._artiklService.getArtiklById(id).subscribe(data => this.artikl = data);
    this.stavka.kolicina=1;
    this.stavka.cijenaBezPdv=this.artikl.mpc;
    this.modalService.dismissAll();
  }
  addStavka(id: any){
    this.stavka.artiklId = this.artikl.artiklId;
    this.stavka.klijentId = this.racun.klijentId;
    this.stavka.skladisteIzlazId = this.racun.skladisteIzlazId;
    this.stavka.jedMjere = this.artikl.jedinicaMjereId;
    this.stavka.redniBroj = this.stavkeLista.length + 1;
    this.stavka.racunId = id;
    console.log(this.stavka);

    this.racun.iznosRacuna+=this.stavka.cijenaBezPdv;
    this.pdvEditIzracun();
    this._stavkaService.addStavka(this.stavka).subscribe(data=> this.stavka = data);

    this.updateRacun();
    window.location.reload();
    this.dodavanje=true;
  }
  
  rabatCalc(){
    //((rabat.cijena*rabat2)+rabat1)*100 (prava formula)
    this.stavka.rabat=this.stavka.rabat1-this.stavka.rabat2;
  }
  pdvEditIzracun(){
    this.racun.iznosSaPdv=(this.racun.iznosRacuna)+(this.racun.iznosRacuna*(this.racun.iznosPoreza/100));
  }
  cijenaCalc(){
    this.stavka.cijenaBezPdv=this.stavka.kolicina*this.artikl.mpc;
  }

  updateRacun(){
    this._racunService.updateRacun(this.racun.racunId,this.racun).subscribe(data => this.racun = data);
    this.uredjivanje=true;
    window.location.reload();
  }
  ToSection(id:string){
    document.getElementById(id)?.scrollIntoView();
  }

  OtkaziIzmjene(){
    window.location.reload();
  }

  DeleteStavkaConfirm(idStavke: any,cijena:any){    
    
    this.racun.iznosRacuna-=cijena;
    this.pdvEditIzracun();
    this._stavkaService.deleteStavka(idStavke).subscribe(data => this.stavkaBrisanje = data);
    console.log(this.stavkaBrisanje);
    this.updateRacun();
    return this._stavkaService.getStavke().subscribe(
      (result)=>{
        window.location.reload();
        this.modalService.dismissAll();
      }
    );
  }

  /**Modal Delete stavke */
  DeleteStavka(content:any)
  {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**Modal GetStavke */
Get(content:any) {
  this.dodavanje=false;
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
