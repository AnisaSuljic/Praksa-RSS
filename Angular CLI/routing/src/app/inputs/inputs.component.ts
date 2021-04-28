import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { IRacun } from '../models/racun.model';
import { RacunService } from '../services/racun.service';
=======
import { IRacun } from '../racun';
import { RacunService } from '../racun.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

>>>>>>> 7f588cab032494f2bba4d1c4008d26f1a1627939

@Component({
  selector: 'app-inputs',
  templateUrl:'/inputs.component.html',
  styleUrls:['/inputs.component.css']
})
export class InputsComponent implements OnInit {
  public racuni : IRacun[] = [];
<<<<<<< HEAD
  constructor(private _racunService: RacunService) { }
=======
  public racunPost: IRacun | undefined;
  closeResult:string='';
  constructor(private _racunService: RacunService,private modalService: NgbModal) { }
>>>>>>> 7f588cab032494f2bba4d1c4008d26f1a1627939

  ngOnInit(): void {
    this._racunService.getRacuni()
        .subscribe(data => this.racuni = data);
  }
<<<<<<< HEAD
  
=======
  addRacun(){
    this._racunService.addRacun(this.racunPost).subscribe(data => this.racunPost = data);
  }

/**Modal GetStavke */
Get(content:any) {
  this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title',size:'lg'}).result.then((result) => {
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
>>>>>>> 7f588cab032494f2bba4d1c4008d26f1a1627939
}
