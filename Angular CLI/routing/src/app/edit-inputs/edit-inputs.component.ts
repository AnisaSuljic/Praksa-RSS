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
import { User } from '../models/user.model';
import { Valuta } from '../models/valuta.model';
import { VrstaPlacanja } from '../models/vrstaplacanja.model';
import { ArtiklService } from '../services/artikl.service';
import { JedinicamjereService } from '../services/jedinicamjere.service';
import { RacunService } from '../services/racun.service';
import { SkladisteService } from '../services/skladiste.service';
import { StavkaService } from '../services/stavka.service';
import { UserService } from '../services/user.service';
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
  artikl: any;
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
  currUser!: User;

  dodavanje:boolean=false;
  uredjivanje:boolean=false;

  _routerSub = Subscription.EMPTY;
  ifsubmit: boolean = true;

  //search
  artiklNaziv:any;
  public artikliFilter : IArtikl[] = [];


  constructor(private _racunService: RacunService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private _artiklService: ArtiklService,
    private _stavkaService: StavkaService,
    private router: Router,private _skladisteService:SkladisteService,
    private _vrstaPlacanja:VrstaplacanjaService,private _valutaService:ValutaService,
    private _jediniceMjereService:JedinicamjereService,
    private _korisnikService:UserService
       ) { 
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
      console.log("artikli");
      this._korisnikService.ucitajKorisnika().subscribe(res => {
        this.currUser = this._korisnikService.currUser;
        //skladista
        this._skladisteService.getSkladiste().subscribe(s => {
          for(let i = 0; i < s.length; i++)
          {
            if(s[i].klijentId==this.currUser.klijentId)
            {
              this.skladista.push(s[i])
            }
          }
        })
        console.log("trenutni->"+this.currUser.ime);
        this.artikliPozivanje(this.currUser);        
    })
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

          this._jediniceMjereService.getJedinicaMjereById(this.stavkeLista[i].jedMjere).subscribe(kl => {
            this.stavkeLista[i].jedMjereNaziv = kl.naziv;
        console.log(this.stavkeLista[i].jedMjereNaziv);
            
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

 artikliPozivanje(user:User)
 {
  console.log("trenutni1->"+this.currUser.ime);
  this.artikliFilter=[];
  this._artiklService.getArtikli().subscribe(a => {
    for(let i=0; i < a.length; i++)
    {
      if(user.klijentId == a[i].klijentId)
      {
        this.artikliFilter.push(a[i]);
      }
    }
    console.log("trenutniniz->"+a);
  });
  
 }

//search
 Search(){
   console.log(this.artiklNaziv);
   if(this.artiklNaziv==""){
        this.artikliPozivanje(this.currUser);
   }
   else{
   console.log(this.artikliFilter);

     this.artikliFilter=this.artikliFilter.filter(res=>{
       return res.naziv.toLocaleLowerCase().match(this.artiklNaziv.toLocaleLowerCase());
     });
    }
 }


  ngOnDestroy() {
    this._routerSub.unsubscribe();
  }
  canDeactivate(): boolean {
    if(JSON.stringify(this.racun) !== JSON.stringify(this.racunZaPoredit)){
      if (confirm("Imate nespremljene promjene! Ako napustite prozor, vaše promjene će biti izgubljene.")) {
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
        return true; // ako ima promjena returning false otvara dialog
      }return true; // ako nema promjena refresha
    }
  getArtiklById(id: any){
    this._artiklService.getArtiklById(id).subscribe(data =>{ 
        this.artikl = data;
        this.stavka.kolicina=1;
    });
    this.modalService.dismissAll();
  }
  addStavka(id: any){
    this.stavka.artiklId = this.artikl.artiklId;
    this.stavka.klijentId = this.racun.klijentId;
    this.stavka.skladisteIzlazId = this.racun.skladisteIzlazId;
    this.stavka.jedMjere = this.artikl.jedinicaMjereId;
    this.stavka.redniBroj = this.stavkeLista.length + 1;
    this.stavka.racunId = id;
    console.log(this.stavka.ulaznaCijena);
    console.log(this.stavka.cijenaBezPdv);

    this._stavkaService.addStavka(this.stavka).subscribe(data=> {
      setTimeout(() =>{
        this.stavka = data;
      },1000);
    });
    this.racun.iznosRacuna+=this.stavka.cijenaBezPdv;
    this.pdvEditIzracun();
    this.updateRacun();

    window.location.reload();
    this.dodavanje=true;
  }
  
  rabatCalc(){
    // this.stavka.rabat=this.stavka.rabat1-this.stavka.rabat2;

    // let rabatCijena = 1 - (this.stavka.rabat1/100);
    //  let iznosRabat2 = this.stavka.rabat2 / 100;
    //  let iznosRabat1 = this.stavka.rabat1 / 100;
     
    //  this.stavka.rabat = ((rabatCijena * iznosRabat2) + iznosRabat1) * 100;

    let rabatCijena = this.stavka.kolicina * this.stavka.cijenaBezPdv * this.stavka.rabat1 / 100;
    let rabat2 = (this.stavka.kolicina*this.stavka.cijenaBezPdv-rabatCijena) * this.stavka.rabat2 / 100;
    let rabat = rabatCijena + rabat2;
    this.stavka.rabat = rabat;
  }
  pdvEditIzracun(){
    this.racun.iznosSaPdv=this.racun.iznosRacuna+this.racun.iznosPoreza;
  }
  cijenaCalc(){
    this.stavka.cijenaBezPdv=this.stavka.kolicina*this.stavka.ulaznaCijena;
  }

  updateRacun(){
    console.log(this.racun);
    this._racunService.updateRacun(this.racun.racunId,this.racun).subscribe(data=> {
      setTimeout(() =>{
        this.racun = data;
      },1000);
    });
    this.uredjivanje=true;
  }
  ToSection(id:string){
    document.getElementById(id)?.scrollIntoView();
  }

  OtkaziIzmjene(){
    window.location.reload();
  }

  DeleteStavkaConfirm(idStavke: any,cijena:any){    
    console.log(cijena);
    this.pdvEditIzracun();
    this._stavkaService.deleteStavka(idStavke).subscribe(data => this.stavkaBrisanje = data);
    this.racun.iznosRacuna-=cijena;
    this.updateRacun();
    console.log(this.stavkaBrisanje);
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
  this.artiklNaziv="";
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
}
