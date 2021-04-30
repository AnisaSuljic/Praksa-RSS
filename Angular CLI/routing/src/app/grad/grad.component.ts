import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Grad } from '../models/grad.model';
import { GradService } from '../services/grad.service';
import { data } from 'jquery';
@Component({
  selector: 'app-grad',
  templateUrl: './grad.component.html',
  styleUrls: ['./grad.component.css']
})
export class GradComponent implements OnInit {

  public grad: Grad[] = [];
  closeResult:string='';
  grad2!: Grad;
  idGrada:number=0;
  constructor(private _gradService: GradService, private modalService: NgbModal) { this.grad2=new Grad(); }

  ngOnInit(): void {
    this._gradService.getGrad().subscribe(data=>this.grad = data);
  }
  onSubmit(){
    this._gradService.addGrad(this.grad2).subscribe(data=> this.grad = data);
  }
  DeleteGrad() {
    this._gradService.deleteGrad(this.idGrada)
    .subscribe(data => this.grad2 = data);
    return this._gradService.getGrad()
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

Delete(content2:any, item:Grad) {
  console.log(item.id);
  this.idGrada=item.id;
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
