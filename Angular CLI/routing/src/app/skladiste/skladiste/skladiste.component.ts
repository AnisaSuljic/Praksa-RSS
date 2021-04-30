import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  constructor(private _skladisteService: SkladisteService, private modalService: NgbModal) { this.skladiste2=new Skladiste();}

    ngOnInit(): void {
      this._skladisteService.getSkladiste().subscribe(data=>this.skladiste = data);
    }
    onSubmit(){
      this._skladisteService.addSkladiste(this.skladiste2).subscribe(data=> this.skladiste = data);
    }
    DeleteSkladiste() {
      return this._skladisteService.deleteSkladiste(this.idSkladista)
      .subscribe((result)=>{
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
  
  Delete(content2:any, item:Skladiste) {
    console.log(item.skladisteId);
    this.idSkladista=item.skladisteId;
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
  
