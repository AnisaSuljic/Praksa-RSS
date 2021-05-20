import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IArtikl } from '../models/artikl.model';
import { Subscriber, Subscription } from 'rxjs';
import { ArtiklService } from '../services/artikl.service';
import { ActivatedRoute } from '@angular/router';
import { Groups } from '../models/grupe.model';
import { Manufacturer } from '../models/manufacturer.model';
import { GroupsService } from '../services/groups.service';
import { ManufacturerService } from '../services/manufacturer.service';
import { GradService } from '../services/grad.service';
import { JedinicamjereService } from '../services/jedinicamjere.service';
import { IJedinicaMjere } from '../models/jedinicamjere.model';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { PorezService } from '../services/porez.service';

@Component({
  selector: 'app-items',
  templateUrl:'/items.component.html',
  styleUrls:['/items.component.css']
})
export class ItemsComponent implements OnInit {
  public artikli : IArtikl[] = [];
  grupe: Groups[] = [];
  proizvodjaci: Manufacturer[]=[];
  jediniceMjere: IJedinicaMjere[]=[];
  currentPage = 1;
  itemsPerPage = 10;
  pageSize!: number;
  closeResult:string='';
  artikl!: IArtikl;
  idartikl: number=0;
  private routeSub!:Subscription;
  currUser!:User;
  constructor(public _artiklService: ArtiklService, public _jedinicaMjereService: JedinicamjereService,
    private modalService: NgbModal,
    private route: ActivatedRoute, public _grupeService: GroupsService,
    public _proizvodjacService: ManufacturerService,
    private _korisnikService: UserService, private _porezService: PorezService) {
    this.artikl = new IArtikl();
    //this._grupeService.getGroups().subscribe(data => this.grupe = data);
    //this._proizvodjacService.get();
    this._korisnikService.ucitajKorisnika().subscribe(res => {
      this.currUser = this._korisnikService.currUser;
      this._artiklService.getArtikli().subscribe(data => {
        this.artikli = data.filter(obj => obj.klijentId == this.currUser.klijentId);
        for (let i = 0; i < this.artikli.length; i++) {
          this._jedinicaMjereService.getJedinicaMjereById(this.artikli[i].jedinicaMjereId!).subscribe(res => {
            this.artikli[i].jedinicaMjereNaziv = res.naziv;
          });
          this._grupeService.getGroupsById(this.artikli[i].grupaId!).subscribe(result =>{
            this.artikli[i].grupaNaziv = result.naziv;
          });
        }
      });
    });
  }
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params=>{this.idartikl=params['id']});
    this._grupeService.getGroups().subscribe(data =>{
      this._korisnikService.promise.then(res => {
        this.grupe = data.filter(obj=>obj.klijentId == res.klijentId); });
      })
    this._proizvodjacService.getManufacturers().subscribe(data =>{ 
      this._korisnikService.promise.then(res => {
        this.proizvodjaci = data.filter(obj=>obj.klijentId == res.klijentId); });
      })
    this._jedinicaMjereService.getJedinicaMjere().subscribe(data => this.jediniceMjere = data);
  }
  onSubmit(){
    console.log(this.artikl);
    //this.artikl.vpc=this.artikl.nc-(1/this.artikl.marza);
    //this.artikl.marza=(this.artikl.mpc-this.artikl.nc)/this.artikl.mpc;
    //this.artikl.marza=this.artikl.mpc-this.artikl.nc;
    this._artiklService.addArtikl(this.artikl)
          .subscribe(data=>this._artiklService.getArtikli().subscribe(data => { this.artikli = data.filter(obj=>obj.klijentId == this.currUser.klijentId);
            for(let i=0; i< this.artikli.length; i++){
            this._jedinicaMjereService.getJedinicaMjereById(this.artikli[i].jedinicaMjereId!).subscribe(data => 
              this.artikli[i].jedinicaMjereNaziv = data.naziv); 
              this._grupeService.getGroupsById(this.artikli[i].grupaId!).subscribe(data => 
                this.artikli[i].grupaNaziv = data.naziv); }}));
  }
  updateArtikl(){
    this._artiklService.updateArtikl(this._artiklService.formData.artiklId, this._artiklService.formData)
        .subscribe(data=> this._artiklService.getArtikli().subscribe(data => { this.artikli = data.filter(obj=>obj.klijentId == this.currUser.klijentId);
          for(let i=0; i< this.artikli.length; i++){
          this._jedinicaMjereService.getJedinicaMjereById(this.artikli[i].jedinicaMjereId!).subscribe(data => 
            this.artikli[i].jedinicaMjereNaziv = data.naziv);
            this._grupeService.getGroupsById(this.artikli[i].grupaId!).subscribe(data => 
              this.artikli[i].grupaNaziv = data.naziv); }}));
        this.ngOnInit();
  }
  DeleteArtikl() {
    this._artiklService.deleteArtikl(this.idartikl)
    .subscribe(data => this.artikl = data);
    return this._artiklService.getArtikli()
    .subscribe(
      (result)=>{
        this.artikli = []; this._artiklService.getArtikli().subscribe(data => { this.artikli = data.filter(obj=>obj.klijentId == this.currUser.klijentId);
          for(let i=0; i< this.artikli.length; i++){
          this._jedinicaMjereService.getJedinicaMjereById(this.artikli[i].jedinicaMjereId!).subscribe(data => 
            this.artikli[i].jedinicaMjereNaziv = data.naziv);
            this._grupeService.getGroupsById(this.artikli[i].grupaId!).subscribe(data => 
              this.artikli[i].grupaNaziv = data.naziv);
          }});
          this.ngOnInit();
          this.modalService.dismissAll();
        }
        );
  }
  unosNC(){
    this.artikl.marza ? this.artikl.marza : this.artikl.marza = 0;
    this.artikl.vpc= +(this.artikl.nc * ( 1 + this.artikl.marza / 100)).toFixed(3);
    let stopa: number;
    if(this.artikl.grupaId){
    this._grupeService.getGroupsById(this.artikl.grupaId).subscribe( res=> {
      this._porezService.getPorezById(res.porezId).subscribe( resu=> {
        stopa = resu.stopa;
        this.artikl.mpc= +(this.artikl.vpc * ( 1 + stopa / 100)).toFixed(3);
      })
    });
  }
  }
  unosMarza(){
    this.artikl.nc ? this.artikl.nc : this.artikl.nc = 0;
    this.artikl.vpc= +(this.artikl.nc * ( 1 + this.artikl.marza / 100)).toFixed(3);
    let stopa: number;
    if(this.artikl.grupaId){
    this._grupeService.getGroupsById(this.artikl.grupaId).subscribe( res=> {
      this._porezService.getPorezById(res.porezId).subscribe( resu=> {
        stopa = resu.stopa;
        this.artikl.mpc= +(this.artikl.vpc * ( 1 + stopa / 100)).toFixed(3);
      })
    });
  }
  }
  unosNCUpdate(){
    this._artiklService.formData.marza ? this._artiklService.formData.marza : this._artiklService.formData.marza = 0;
    this._artiklService.formData.vpc= +(this._artiklService.formData.nc * (1 + this._artiklService.formData.marza/100)).toFixed(3);
     let stopa: number;
     this._grupeService.getGroupsById(this.artikl.grupaId).subscribe( res=> {
       this._porezService.getPorezById(res.porezId).subscribe( resu=> {
         stopa = resu.stopa;
         this.artikl.mpc= +(this._artiklService.formData.vpc * ( 1 + stopa / 100)).toFixed(3);
       })
     });
  }
  unosMarzaUpdate(){
    this._artiklService.formData.nc ? this._artiklService.formData.nc : this._artiklService.formData.nc = 0;
    this._artiklService.formData.vpc= +(this._artiklService.formData.nc * (1 + this._artiklService.formData.marza/100)).toFixed(3);
     let stopa: number;
     this._grupeService.getGroupsById(this.artikl.grupaId).subscribe( res=> {
       this._porezService.getPorezById(res.porezId).subscribe( resu=> {
         stopa = resu.stopa;
         this.artikl.mpc= +(this._artiklService.formData.vpc * ( 1 + stopa / 100)).toFixed(3);
       })
     });
  }
  unosVPC(){
    if(this.artikl.nc > 0 && this.artikl.vpc > 0){
      this.artikl.marza = +(((this.artikl.vpc - this.artikl.nc)/this.artikl.nc)*100).toFixed(3);
      let stopa: number;
      this._grupeService.getGroupsById(this.artikl.grupaId).subscribe( res=> {
        this._porezService.getPorezById(res.porezId).subscribe( resu=> {
          stopa = resu.stopa;
          this.artikl.mpc= +(this.artikl.vpc * ( 1 + stopa / 100)).toFixed(3);
        })
      });
    }
  }
  unosCijene(){
    if(this.artikl.nc > 0 && this.artikl.vpc > 0){
      let stopa: number;
      this._grupeService.getGroupsById(this.artikl.grupaId).subscribe( res=> {
        this._porezService.getPorezById(res.porezId).subscribe( resu=> {
          stopa = resu.stopa;
          this.artikl.vpc= +(this.artikl.mpc / (1 + stopa / 100)).toFixed(3);
          this.artikl.marza = +((((this.artikl.mpc / (1 + stopa /100)) / this.artikl.nc) - 1) * 100).toFixed(3);
        })
      });
    }
  }
  unosVPCUpdate(){
    if(this._artiklService.formData.nc > 0 && this._artiklService.formData.vpc > 0){
      this._artiklService.formData.marza = +(((this._artiklService.formData.vpc - this._artiklService.formData.nc)/this._artiklService.formData.nc) * 100).toFixed(3);
      let stopa: number;
      this._grupeService.getGroupsById(this.artikl.grupaId).subscribe( res=> {
        this._porezService.getPorezById(res.porezId).subscribe( resu=> {
          stopa = resu.stopa;
          this.artikl.mpc= +(this._artiklService.formData.vpc * ( 1 + stopa / 100)).toFixed(3);
        })
      });
    }
  }
  unosCijeneUpdate(){
    if(this._artiklService.formData.nc > 0 && this._artiklService.formData.vpc > 0){
      let stopa: number;
      this._grupeService.getGroupsById(this.artikl.grupaId).subscribe( res=> {
        this._porezService.getPorezById(res.porezId).subscribe( resu=> {
          stopa = resu.stopa;
          this._artiklService.formData.vpc= +(this._artiklService.formData.mpc / (1 + stopa / 100)).toFixed(3);
          this._artiklService.formData.marza = +((((this._artiklService.formData.mpc / (1 + stopa /100)) / this._artiklService.formData.nc) - 1) * 100).toFixed(3);
        })
      });
    }
  }
  
 public onPageChange(pageNum: number): void {
  this.pageSize = this.itemsPerPage*(pageNum - 1);
  }
/**Modal Add */
Add(content:any) {
  this.artikl = new IArtikl();
  if(this.artikli.length > 0){
    this.artikl.sifra = (Number.parseInt(this.artikli[this.artikli.length - 1].sifra!) + 1).toString();
  }
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
/**Modal Update */

Update(content1:any, item: IArtikl) {
  this.idartikl = item.artiklId;
  this._artiklService.formData=Object.assign({}, item);
  this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
/**Modal Delete */

Delete(content2:any, item:IArtikl) {
  console.log(item.artiklId);
  this.idartikl=item.artiklId;
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
