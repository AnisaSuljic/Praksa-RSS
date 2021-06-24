import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Groups } from '../models/grupe.model';
import { GroupsService } from '../services/groups.service';
import { data } from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { Porez } from '../models/porez.model';
import { PorezService } from '../services/porez.service';
import { Vrsta } from '../models/vrsta.model';
import { VrstaService } from '../services/vrsta.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-groups',
  templateUrl:'/groups.component.html',
  styleUrls:['/groups.component.css']
})
export class GroupsComponent implements OnInit {
  public grupe : Groups[] = [];
  porezi: Porez[]=[];
  vrste: Vrsta[]=[];
  closeResult:string='';
  grupa!: Groups;
  idgroup: number=0;
  currentPage = 1;
  itemsPerPage = 10;
  pageSize!: number;
  uspjesnoDodavanje:boolean=false;
  private routeSub!:Subscription;
  currUser!: User;
  constructor(public _groupService: GroupsService, private modalService: NgbModal, private router:Router,
   private _porezService:PorezService, private _vrstaService:VrstaService, private _korisnikService: UserService) 
  {
    this._korisnikService.ucitajKorisnika().subscribe(res=> { this.currUser = this._korisnikService.currUser; 
      this._groupService.getGroups().subscribe(data =>{ this.grupe = data.filter(obj=>obj.klijentId == this.currUser.klijentId);
      for(let i=0; i< this.grupe.length; i++){
        this._vrstaService.getVrstaById(this.grupe[i].vrstaId!).subscribe(res=>{this.grupe[i].vrstaNaziv = res.naziv});
        this._porezService.getPorezById(this.grupe[i].porezId!).subscribe(res=>{this.grupe[i].porezNaziv = res.nazivPoreza});
      }
      });
      this._porezService.getPorez().subscribe(data =>{ this.porezi = data.filter(obj=>obj.klijentId == this.currUser.klijentId); });
      this._vrstaService.getVrsta().subscribe(data =>{ this.vrste = data.filter(obj=>obj.klijentId == this.currUser.klijentId); });
    });
    this.grupa = new Groups();
   }

  ngOnInit(): void {
  }
  
  onSubmit(){
    this._groupService.addGroups(this.grupa).subscribe((result)=>{
      this._groupService.getGroups().subscribe(data =>{ this.grupe = data.filter(obj=>obj.klijentId == this.currUser.klijentId);
        for(let i=0; i< this.grupe.length; i++){
          this._vrstaService.getVrstaById(this.grupe[i].vrstaId!).subscribe(res=>{this.grupe[i].vrstaNaziv = res.naziv});
          this._porezService.getPorezById(this.grupe[i].porezId!).subscribe(res=>{this.grupe[i].porezNaziv = res.nazivPoreza});
        }
        });
    });
  }
  updateGroups() {
    this._groupService.updateGroups(this._groupService.formData.grupaId, this._groupService.formData)
      .subscribe(data => this._groupService.getGroups().subscribe(res => { this.grupe = []; this._groupService.getGroups().subscribe(data =>{ this.grupe = data.filter(obj=>obj.klijentId == this.currUser.klijentId);
        for(let i=0; i< this.grupe.length; i++){
          this._vrstaService.getVrstaById(this.grupe[i].vrstaId!).subscribe(res=>{this.grupe[i].vrstaNaziv = res.naziv});
          this._porezService.getPorezById(this.grupe[i].porezId!).subscribe(res=>{this.grupe[i].porezNaziv = res.nazivPoreza});
        }
        }); }));
    this.ngOnInit();
  }
  Zatvori(){
    this.router.navigate(["/adminpanel/groups"]);
  }
  DeleteGroup() {
    this._groupService.deleteGroups(this.idgroup)
    .subscribe(data => this.grupa = data);
    return this._groupService.getGroups()
    .subscribe(
      (result)=>{
        this.grupe = []; this._groupService.getGroups().subscribe(data => this._groupService.getGroups().subscribe(res => { this.grupe = []; this._groupService.getGroups().subscribe(data =>{ this.grupe = data.filter(obj=>obj.klijentId == this.currUser.klijentId);
          for(let i=0; i< this.grupe.length; i++){
            this._vrstaService.getVrstaById(this.grupe[i].vrstaId!).subscribe(res=>{this.grupe[i].vrstaNaziv = res.naziv});
            this._porezService.getPorezById(this.grupe[i].porezId!).subscribe(res=>{this.grupe[i].porezNaziv = res.nazivPoreza});
          }
          }); }));
        this.ngOnInit();
        this.modalService.dismissAll();
      }
    );
  }
  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
  }
  filterPoNazivu(pretraga:any){
    this._groupService.getGroups().subscribe(data=> {
      this.grupe=data.filter(fil=>fil.naziv.toLowerCase()?.includes(pretraga.value.toLowerCase()));
      for(let i=0; i< this.grupe.length; i++){
        this._vrstaService.getVrstaById(this.grupe[i].vrstaId!).subscribe(res=>{this.grupe[i].vrstaNaziv = res.naziv});
        this._porezService.getPorezById(this.grupe[i].porezId!).subscribe(res=>{this.grupe[i].porezNaziv = res.nazivPoreza});
      }
    });
  }
/**Modal Add */
Add(content:any) {
  this.grupa = new Groups();
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
/**Modal Update */

Update(content1:any, item:Groups) {
  this.idgroup=item.grupaId;
  this._groupService.formData = Object.assign({},item);
  this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
/**Modal Delete */

Delete(content2:any, item:Groups) {
  console.log(item.grupaId);
  this.idgroup=item.grupaId;
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
