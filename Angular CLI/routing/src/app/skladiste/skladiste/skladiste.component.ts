import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Porez } from '../../models/porez.model';
import { PorezService } from '../../services/porez.service';
import { data } from 'jquery';
import { Skladiste } from 'src/app/models/skladiste.model';
import { SkladisteService } from 'src/app/services/skladiste.service';
@Component({
  selector: 'app-skladiste',
  templateUrl: './skladiste.component.html',
  styleUrls: ['./skladiste.component.css']
})
export class SkladisteComponent implements OnInit {
  public skladiste: Skladiste[] = [];
  closeResult:string='';
  skladiste2!: Skladiste;
  idSkladista:number=0;
  constructor(private _skladisteService: SkladisteService, private modalService: NgbModal) { }

    ngOnInit(): void {
      this._skladisteService.getSkladiste().subscribe(data=>this.skladiste = data);
    }
  
    DeletePorez() {
      this._skladisteService.deleteSkladiste(this.idSkladista)
      .subscribe(data => this.skladiste2 = data);
      return this._skladisteService.getSkladiste()
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
  
