import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Porez } from '../../models/porez.model';
import { PorezService } from '../../services/porez.service';
import { data } from 'jquery';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-porez',
  templateUrl: './porez.component.html',
  styleUrls: ['./porez.component.css']
})
export class PorezComponent implements OnInit {
  public porez: Porez[] = [];
  closeResult:string='';
  porez2!: Porez;
  idPoreza:number=0;
  currUser!: User;
  currentPage = 1;
  itemsPerPage = 10;
  pageSize!: number;
  constructor(public _porezService: PorezService, private modalService: NgbModal,
    private _korisnikService: UserService) { 
      this._korisnikService.ucitajKorisnika().subscribe(res=> { this.currUser = this._korisnikService.currUser;  
      this._porezService.getPorez().subscribe(data=>{this.porez = data.filter(obj=>obj.klijentId == this.currUser.klijentId);
      });
      });
      this.porez2=new Porez(); }

  ngOnInit(): void {
  }
  onSubmit(){
    this._porezService.addPorez(this.porez2)
    .subscribe(data=> this._porezService.getPorez().subscribe(data=>{this.porez = data.filter(obj=>obj.klijentId == this.currUser.klijentId);
    })
   );
  }
  updatePorez() {
    this._porezService.updatePorez(this._porezService.formData.porezId, this._porezService.formData)
      .subscribe(data => this._porezService.getPorez().subscribe(res => { this.porez = []; this._porezService.getPorez().subscribe(data=>{this.porez = data.filter(obj=>obj.klijentId == this.currUser.klijentId);
      }); }));
    this.ngOnInit();
  }
  DeletePorez() {
    this._porezService.deletePorez(this.idPoreza)
    .subscribe(data => this.porez2 = data);
    return this._porezService.getPorez()
    .subscribe(
      (result)=>{
        this.porez = []; this._porezService.getPorez().subscribe(data => { this.porez = data.filter(obj=> obj.klijentId == this.currUser.klijentId);
        });
        this.ngOnInit();
        this.modalService.dismissAll();
      }
    );
  }
  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
    }
    filterPoNazivu(pretraga:any){
      this._porezService.getPorez().subscribe(data=> this.porez=data.filter(fil=> fil.nazivPoreza.toLowerCase()?.includes(pretraga.value.toLowerCase())));
    }
/**Modal Add */
Add(content:any) {
  this.porez2 = new Porez();
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
/**Modal Update */

Update(content1:any, item: Porez) {
  this.idPoreza = item.porezId;
  this._porezService.formData= Object.assign({}, item);
  this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
/**Modal Delete */

Delete(content2:any, item:Porez) {
  console.log(item.porezId);
  this.idPoreza=item.porezId;
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
