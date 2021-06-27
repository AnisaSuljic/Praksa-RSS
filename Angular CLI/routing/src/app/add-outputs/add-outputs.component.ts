import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from '../models/customer.model';
import { IRacun } from '../models/racun.model';
import { Skladiste } from '../models/skladiste.model';
import { User } from '../models/user.model';
import { Valuta } from '../models/valuta.model';
import { VrstaPlacanja } from '../models/vrstaplacanja.model';
import { CustomerService } from '../services/customer.service';
import { GradService } from '../services/grad.service';
import { RacunService } from '../services/racun.service';
import { SkladisteService } from '../services/skladiste.service';
import { UserService } from '../services/user.service';
import { ValutaService } from '../services/valuta.service';
import { VrstaplacanjaService } from '../services/vrstaplacanja.service';

@Component({
  selector: 'app-add-outputs',
  templateUrl: './add-outputs.component.html',
  styleUrls: ['./add-outputs.component.css']
})
export class AddOutputsComponent implements OnInit {
  closeResult:string='';
  racuni: IRacun;
  skladista: Skladiste[] = [];
  vrsteplacanja: VrstaPlacanja[] = [];
  valute: Valuta[] = [];
  customers: Customer[] = [];
  racuniLista: IRacun[] = [];
  dodavanje:boolean=false;
  datum1:Date;
  cust:any;

  TempRacun:IRacun;

  currUser!: User;

  constructor(private _racunService: RacunService,
    private _skladisteService: SkladisteService,
     private router: Router,
     private _vrstaPlacanja: VrstaplacanjaService,
     private _valuteService: ValutaService,
     private _customerService : CustomerService,private _korisnikService:UserService,
    private modalService: NgbModal, private _gradService:GradService) {
     this.racuni = new IRacun();
     this.TempRacun=new IRacun();
     this.datum1=new Date();
     this.cust=null;

    }
  ngOnInit(): void {
    this._vrstaPlacanja.getVrsta().subscribe(data => this.vrsteplacanja = data);
    this._valuteService.getValuta().subscribe(data => this.valute = data);

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
      //kupci
       this._customerService.getCustomers().subscribe(k => {
        for(let i = 0; i < k.length; i++)
        {
          if(k[i].klijentId==this.currUser.klijentId)
          {
            this.customers.push(k[i]);
          }
        }
      })

      this._racunService.getRacuni().subscribe(data => {
        for(let i = 0; i < data.length; i++){
          if(data[i].skladisteIzlazId!=null && data[i].klijentId==this.currUser.klijentId)
          {
              this.racuniLista.push(data[i])
          }
        }
        this.racuni.brojRacuna= "2021/br"+(this.racuniLista.length + 1).toString();

      })
  })
  }
  getLastRacunID(brojRacuna : string){
    if(this.racuniLista != null){
      for(let i=0; i < this.racuniLista.length; i++){
        if(this.racuniLista[i].brojRacuna == brojRacuna){
          return this.racuniLista[i].racunId;
        }
      }
    }
    return 0;
  }
  onSubmit(){
    this.racuni.kupacId=this.cust.kupacId;
    this._racunService.addRacun(this.racuni).subscribe(data=> {this.TempRacun=data;
    let ID=this.TempRacun.racunId;
    
    this.router.navigate([`/adminpanel/editOutputs/${ID}`]);      

    });
  }
  filterPoNazivuKupac(pretraga: any){
    this._korisnikService.ucitajKorisnika().subscribe(res => {
      this.currUser = this._korisnikService.currUser;
      this._customerService.getCustomers().subscribe(data => {
        this.customers = data.filter(obj => obj.klijentId == this.currUser.klijentId && obj.naziv?.toLowerCase()?.includes(pretraga.value.toLowerCase()));
        for (let i = 0; i < this.customers.length; i++) {
          this._gradService.getGradById(this.customers[i].gradId!).subscribe(data=>
            this.customers[i].gradNaziv = data.naziv)
        }
      });
    });
  }

  /**Modal GetStavke */
  Get(content:any) {
    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    this.cust=null;
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  getCustomerById(id: any){
    this._customerService.getCustomerById(id).subscribe(data => {
      this.cust = data;
    });

    this.modalService.dismissAll();
  }
}
