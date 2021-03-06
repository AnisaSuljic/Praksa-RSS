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
import { VrstaplacanjaService } from '../services/vrstaplacanja.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { JedinicamjereService } from '../services/jedinicamjere.service';



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
  idStavke:number=0;
  stavkaEditID:number=0;
  public stavkeBaza : IStavka[] = [];
  brisanje:boolean=false;
  public dodavanje:boolean=false;
  public artikli : IArtikl[] = [];
  EditeStavka!: IStavka;
  artikl: any;
  currUser!: User;
//pageing
  currentPage = 1;
  itemsPerPage = 10;
  pageSize!: number;

  //search
  racunNaziv:any;

  constructor(private _racunService: RacunService,
    private modalService: NgbModal,
    private _stavkaService: StavkaService,
    private _artiklService:ArtiklService,
    private _skladisteService: SkladisteService,
    private _vrstaPlacanjaService:VrstaplacanjaService,
    private _korisnikService:UserService,private _jediniceMjereService:JedinicamjereService)
    { 
      this.artikl=null;

      this.RacuniPozivanje()
     }

  ngOnInit(): void {
        
        this.GetStavke();
        this._artiklService.getArtikli()
            .subscribe(data => this.artikli = data);
        
  }

  RacuniPozivanje()
  {
    this._korisnikService.ucitajKorisnika().subscribe(res => {
      this.currUser = this._korisnikService.currUser;
      console.log("klk"+this.currUser);

      this._racunService.getRacuni()
          .subscribe(data => {
            console.log(data);
            console.log("user=>"+this.currUser);
            for (let i = 0; i < data.length; i++){
              if(data[i].skladisteUlazId!=null && data[i].klijentId==this.currUser.klijentId)
              {
                this.racuni.push(data[i])
              }                
            }
            for(let j=0;j<this.racuni.length;j++){
              this._skladisteService.getSkladisteById(this.racuni[j].skladisteUlazId).subscribe(l=>{
                this.racuni[j].nazivSkladista = l.naziv})   
                this._vrstaPlacanjaService.getVrstaById(this.racuni[j].vrstaPlacanjaId).subscribe(v=>{
                  this.racuni[j].nazivVrstePlacanja = v.naziv})                  
            }
          });
    });
  }

  public onPageChange(pageNum: number): void {

    this.pageSize = this.itemsPerPage*(pageNum - 1);
    
    }
    filterPoNazivu(pretraga:any){
      this._korisnikService.ucitajKorisnika().subscribe(res => {
        this.currUser = this._korisnikService.currUser;
        this._racunService.getRacuni().subscribe(data => {
          this.racuni = data.filter(obj => obj.klijentId == this.currUser.klijentId && 
                obj.brojRacuna.toLowerCase()?.includes(pretraga.value.toLowerCase()) && 
                    obj.skladisteUlazId != null);
          for (let i = 0; i < this.racuni.length; i++) {
            this._skladisteService.getSkladisteById(this.racuni[i].skladisteUlazId!).subscribe(res => { this.racuni[i].nazivSkladista = res.naziv });
            this._vrstaPlacanjaService.getVrstaById(this.racuni[i].vrstaPlacanjaId).subscribe(v=>{ this.racuni[i].nazivVrstePlacanja = v.naziv})  
          }
        });
      });
    }
  GetStavke()
  {
    this._stavkaService.getStavke().subscribe(data => {
      for(let i = 0; i < data.length; i++)
      {
      
        this.stavkeBaza.push(data[i]);
        this._artiklService.getArtiklById(this.stavkeBaza[i].artiklId).subscribe(l => {
          this.stavkeBaza[i].nazivArtikla = l.naziv;
          this.stavkeBaza[i].sifraArtikla = l.sifra;
          this.stavkeBaza[i].vpc = l.vpc;
          this.stavkeBaza[i].mpc = l.mpc;
          this.stavkeBaza[i].jedMjere = l.jedinicaMjereId;
          this._jediniceMjereService.getJedinicaMjereById(l.jedinicaMjereId).subscribe(kl => {
            this.stavkeBaza[i].jedMjereNaziv = kl.naziv;
          })
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
  DeleteStavka(){
    return this._stavkaService.deleteStavka(this.idStavke)
    .subscribe(
      (result)=>{
          window.location.reload();
      }
    );
  }

  getArtiklById(id: any){
    console.log(id);
    this._artiklService.getArtiklById(id).subscribe(data => this.artikl = data);
    this.modalService.dismissAll();
  }
  /**Modal Artikli */

Artikli(contentArtikli:any)
{
  this.modalService.open(contentArtikli, {ariaLabelledBy: 'modal-basic-title',size:'lg'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
  /**Modal StavkaEdit */

GetEdit(contentEdit:any,id:any){
  
  this.modalService.open(contentEdit, {ariaLabelledBy: 'modal-basic-title',size:'lg'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });

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
/**Modal Delete racun */
Delete(content2:any,item:IRacun) {
  console.log(item.racunId);
  this.idRacuna=item.racunId;
  this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
/**Modal Delete stavka */
Delete1(content3:any,item:IStavka) {
  console.log(item.racunId);
  this.idRacuna=item.racunId;
  this.idStavke=item.stavkeId;
  this.modalService.open(content3, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
