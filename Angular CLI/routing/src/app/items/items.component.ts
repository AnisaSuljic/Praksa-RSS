import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IArtikl } from '../models/artikl.model';
import { Subscriber, Subscription } from 'rxjs';
import { ArtiklService } from '../services/artikl.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl:'/items.component.html',
  styleUrls:['/items.component.css']
})
export class ItemsComponent implements OnInit {
  public artikli : IArtikl[] = [];
  closeResult:string='';
  artikl!: IArtikl;
  idartikl: number=0;
  private routeSub!:Subscription;

  constructor(private _artiklService: ArtiklService, private modalService: NgbModal,private route:ActivatedRoute)
  {
    this.artikl = new IArtikl();
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params=>{this.idartikl=params['id']});
    this._artiklService.getArtikli().subscribe(data => this.artikli = data);
    console.log(this.artikl);
  }
  onSubmit(){
    this._artiklService.addArtikl(this.artikl).subscribe(data=> this.artikli = data);
  }
  DeleteArtikl() {
    this._artiklService.deleteArtikl(this.idartikl)
    .subscribe(data => this.artikl = data);
    return this._artiklService.getArtikli()
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

Delete(content2:any, item:IArtikl) {
  console.log(item.artiklId);
  this.idartikl=item.artiklId;
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
