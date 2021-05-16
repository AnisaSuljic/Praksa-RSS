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
   
  closeResult:string='';
  artikl!: IArtikl;
  idartikl: number=0;
  private routeSub!:Subscription;
  currUser!:User;
  constructor(public _artiklService: ArtiklService, public _jedinicaMjereService: JedinicamjereService,
     private modalService: NgbModal,
     private route:ActivatedRoute, public _grupeService:GroupsService, 
     public _proizvodjacService: ManufacturerService,
     private _korisnikService:UserService)
  {
    this.artikl = new IArtikl();
    //this._grupeService.getGroups().subscribe(data => this.grupe = data);
    //this._proizvodjacService.get();
    this._korisnikService.ucitajKorisnika().subscribe(res=> { this.currUser = this._korisnikService.currUser; }); 
  }
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params=>{this.idartikl=params['id']});
    this._artiklService.getArtikli().subscribe(data => { this.artikli = data.filter(obj=>obj.klijentId == this.currUser.klijentId);
    for(let i=0; i< this.artikli.length; i++){
    this._artiklService.getArtiklById(this.artikli[i].jedinicaMjereId!).subscribe(data => 
      this.artikli[i].jedinicaMjereNaziv = data.naziv); }});
    
    this._grupeService.getGroups().subscribe(data=> this.grupe = data);
    this._proizvodjacService.getManufacturers().subscribe(data=> this.proizvodjaci = data);
    this._jedinicaMjereService.getJedinicaMjere().subscribe(data => this.jediniceMjere = data);
  }
  onSubmit(){
    console.log(this.artikl);
    this._artiklService.addArtikl(this.artikl)
          .subscribe(data=>this._artiklService.getArtikli().subscribe(res=>this.artikli = res));
  }
  updateArtikl(){
    this._artiklService.updateArtikl(this._artiklService.formData.artiklId, this._artiklService.formData)
        .subscribe(data=> this._artiklService.getArtikli().subscribe(res=> this.artikli = res));
        this.ngOnInit();
  }
  DeleteArtikl() {
    this._artiklService.deleteArtikl(this.idartikl)
    .subscribe(data => this.artikl = data);
    return this._artiklService.getArtikli()
    .subscribe(
      (result)=>{
        this.artikli = []; this._artiklService.getArtikli().subscribe(data=> this.artikli=data);
        this.ngOnInit();
        this.modalService.dismissAll();
      }
    );
  }
/**Modal Add */
Add(content:any) {
  this.artikl = new IArtikl();
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
