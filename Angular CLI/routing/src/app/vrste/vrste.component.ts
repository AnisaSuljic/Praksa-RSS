import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscriber, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Vrsta } from '../models/vrsta.model';
import { VrstaService } from '../services/vrsta.service';

@Component({
  selector: 'app-vrste',
  templateUrl: './vrste.component.html',
  styleUrls: ['./vrste.component.css']
})
export class VrsteComponent implements OnInit {
  public vrste : Vrsta[] = [];
  closeResult:string='';
  vrsta!: Vrsta;
  idvrsta: number=0;
  constructor(private _vrsteService: VrstaService, private modalService: NgbModal, private router:Router) 
  {
    this.vrsta = new Vrsta();
   }

  ngOnInit(): void {
    this._vrsteService.getVrsta().subscribe(data => this.vrste = data);
    console.log(this.vrsta);
    this.router.navigate(["/adminpanel/vrste"]);
  }
  onSubmit(){
    this._vrsteService.addVrsta(this.vrsta).subscribe(data=> this.vrste = data);
  }
  updateVrsta(){
    console.log(this.vrsta);
    this._vrsteService.updateVrsta(this.vrsta.vrstaId,this.vrsta).subscribe(data => this.vrsta = data);
  }

  DeleteVrsta() {
    this._vrsteService.deleteVrsta(this.idvrsta)
    .subscribe(data => this.vrsta = data);
    return this._vrsteService.getVrsta()
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

Update(content1:any, item:Vrsta) {
  console.log(item.vrstaId);
  this.idvrsta=item.vrstaId;
  this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
/**Modal Delete */

Delete(content2:any, item:Vrsta) {
  console.log(item.vrstaId);
  this.idvrsta=item.vrstaId;
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
