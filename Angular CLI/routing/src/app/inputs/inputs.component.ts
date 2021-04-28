import { Component, OnInit } from '@angular/core';
import { IRacun } from '../models/racun.model';
import { RacunService } from '../services/racun.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-inputs',
  templateUrl:'/inputs.component.html',
  styleUrls:['/inputs.component.css']
})
export class InputsComponent implements OnInit {
  public racuni : IRacun[] = [];
  closeResult:string='';
  constructor(private _racunService: RacunService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this._racunService.getRacuni()
        .subscribe(data => this.racuni = data);
  }
  /**Modal GetItems */
Get(content:any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:'lg'}).result.then((result) => {
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
