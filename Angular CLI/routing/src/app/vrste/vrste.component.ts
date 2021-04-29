import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IArtikl } from '../models/artikl.model';
import { Subscriber, Subscription } from 'rxjs';
import { ArtiklService } from '../services/artikl.service';
import { ActivatedRoute } from '@angular/router';
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
  private routeSub!:Subscription;
  constructor(private _vrsteService: VrstaService, private modalService: NgbModal,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params=>{this.idvrsta=params['id']});
    this._vrsteService.getVrsta().subscribe(data => this.vrste = data);
    console.log(this.vrsta);
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

Update(content1:any) {
  this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
/**Modal Delete */

Delete(content2:any) {
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
