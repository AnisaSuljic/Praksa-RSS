import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Porez } from '../../models/porez.model';
import { PorezService } from '../../services/porez.service';
import { data } from 'jquery';

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
  constructor(private _porezService: PorezService, private modalService: NgbModal) { this.porez2=new Porez(); }

  ngOnInit(): void {
    this._porezService.getPorez().subscribe(data=>this.porez = data);
  }
  onSubmit(){
    this._porezService.addPorez(this.porez2).subscribe(data=> this.porez = data);
  }
  DeletePorez() {
    this._porezService.deletePorez(this.idPoreza)
    .subscribe(data => this.porez2 = data);
    return this._porezService.getPorez()
    .subscribe(
      (result)=>{
        this.ngOnInit();
        this.modalService.dismissAll();
      }
    );
  }

/**Modal Add */
Add(content:any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
/**Modal Update */

Update(content1:any) {
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
