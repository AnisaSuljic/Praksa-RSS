import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { IArtikl } from '../models/artikl.model';
import { IStavka } from '../models/stavka.model';
import { IRacun } from '../models/racun.model';
import { ArtiklService } from '../services/artikl.service';
import { RacunService } from '../services/racun.service';
import { StavkaService } from '../services/stavka.service';
import { Skladiste } from '../models/skladiste.model';
import { VrstaPlacanja } from '../models/vrstaplacanja.model';
import { Valuta } from '../models/valuta.model';
import { VrstaplacanjaService } from '../services/vrstaplacanja.service';
import { ValutaService } from '../services/valuta.service';
import { SkladisteService } from '../services/skladiste.service';
import { JedinicamjereService } from '../services/jedinicamjere.service';
import { IJedinicaMjere } from '../models/jedinicamjere.model';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-outputs',
  templateUrl: './edit-outputs.component.html',
  styleUrls: ['./edit-outputs.component.css']
})
export class EditOutputsComponent implements OnInit {
  closeResult:string='';
  id:number = 0;
  racun!: IRacun;
  racunZaPoredit!: IRacun;
  artikl: any;
  stavka: IStavka = new IStavka();
  stavkaZaDelete: IStavka = new IStavka();
  public artikli : IArtikl[] = [];
  public stavke : IStavka[] = [];
  public stavkeZaPrikazSaId : IStavka[] = [];
  private routeSub!: Subscription;
  public jedinicemjere: IJedinicaMjere[] = [];
  skladista: Skladiste[] = [];
  vrsteplacanja: VrstaPlacanja[] = [];
  valute: Valuta[] = [];
  currUser!: User;

    //search
    artiklNaziv:any;

  _routerSub = Subscription.EMPTY;
  ifsubmit: boolean = true;


  constructor(private _racunService: RacunService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private _artiklService: ArtiklService,
    private _stavkaService: StavkaService,
    private router: Router,
    private _vrstaPlacanja: VrstaplacanjaService,
    private _valuteService: ValutaService,
    private _skladisteService: SkladisteService,
    private _jediniceMjereService: JedinicamjereService,
    private _korisnikService:UserService
    ) { 
      this.artikl = null; 
      this.stavka = new IStavka();

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
    this._racunService.getRacunById(this.id).subscribe(data => {
      this.racun = data;
      this.racunZaPoredit = Object.assign({}, this.racun);
    });
    this.currUser = this._korisnikService.currUser;

    this._artiklService.getArtikli()
        .subscribe(data => {
          for(let i=0; i < data.length; i++){
            if(this.currUser.klijentId == data[i].klijentId){
              this.artikli.push(data[i]);
            }
          }
              });
    this._jediniceMjereService.getJedinicaMjere().subscribe(data => this.jedinicemjere = data);
    this._stavkaService.getStavke().subscribe(data => {
      for(let i = 0; i < data.length; i++){
        this.stavke.push(data[i]);
        this._artiklService.getArtiklById(this.stavke[i].artiklId).subscribe(l => {
          this.stavke[i].nazivArtikla = l.naziv;
          this.stavke[i].sifraArtikla = l.sifra;
          this.stavke[i].vpc = l.vpc;
          this.stavke[i].mpc = l.mpc;
          this.stavke[i].jedMjere = l.jedinicaMjereId;
          this._jediniceMjereService.getJedinicaMjereById(l.jedinicaMjereId).subscribe(kl => {
            this.stavke[i].jedMjereNaziv = kl.naziv;
          })
        });
      }
    });
    
    for(let item of this.stavke){
      if(item.racunId == this.id){
        console.log("1");
        this.stavkeZaPrikazSaId.push(item);
      }
    }
    this._skladisteService.getSkladiste().subscribe(data => this.skladista = data);
    this._vrstaPlacanja.getVrsta().subscribe(data => this.vrsteplacanja = data);
    this._valuteService.getValuta().subscribe(data => this.valute = data);
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
  DeleteStavka(idStavke: any){
    this._stavkaService.deleteStavka(idStavke).subscribe(data => this.stavkaZaDelete = data);
    return this._stavkaService.getStavke().subscribe(
      (result)=>{
        window.location.reload();
        this.modalService.dismissAll();
      }
    );
  }
  artikliPozivanje()
{
  this._artiklService.getArtikli()
        .subscribe(data => this.artikli = data);
}
  //search
Search(){
  console.log(this.artiklNaziv);
  if(this.artiklNaziv==""){
    this.artikliPozivanje();
  }
  else{
  console.log(this.artikli);

    this.artikli=this.artikli.filter(res=>{
      return res.naziv.toLocaleLowerCase().match(this.artiklNaziv.toLocaleLowerCase());
    });
  }
}
  addStavka(id: any){
    this.stavka.artiklId = this.artikl.artiklId;
    this.stavka.klijentId = this.racun.klijentId;
    this.stavka.skladisteIzlazId = this.racun.skladisteIzlazId;
    this.stavka.jedMjere = this.artikl.jedinicaMjereId;
    this.stavka.redniBroj = this.stavke.length + 1;
    this.stavka.racunId = id;
    console.log(this.stavka);
    this._stavkaService.addStavka(this.stavka).subscribe(data=> this.stavka = data);
    this.router.navigate(["/adminpanel/outputs"]).then(()=> {
      window.location.reload();
    });
  }
  updateRacun(){
    this.ifsubmit = false;
    console.log(this.racun);
    this._racunService.updateRacun(this.racun.racunId,this.racun).subscribe(data => this.racun = data);
    this.router.navigate(["/adminpanel/outputs"]);
  }
  ToSection(id:string){
    document.getElementById(id)?.scrollIntoView();
  }
  /**Modal GetStavke */
  Get(content:any) {
    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  
  onKey(event: any) {
     let rabatCijena = 1 - (this.stavka.rabat1/100);
     let iznosRabat2 = this.stavka.rabat2 / 100;
     let iznosRabat1 = this.stavka.rabat1 / 100;
     
     this.stavka.rabat = ((rabatCijena * iznosRabat2) + iznosRabat1) * 100;
  }
  getArtiklById(id: any){
    this._artiklService.getArtiklById(id).subscribe(data => {
      this.artikl = data;
      this._jediniceMjereService.getJedinicaMjereById(this.artikl.jedinicaMjereId).subscribe(kl => {
        this.artikl.jedinicaMjereNaziv = kl.naziv;
      });
    });

    console.log(this.jedinicemjere);
    this.modalService.dismissAll();
  }
/**Modal Delete */
Delete(content2:any) {
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
