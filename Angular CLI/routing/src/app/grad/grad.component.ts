import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Grad } from '../models/grad.model';
import { GradService } from '../services/grad.service';
import { data } from 'jquery';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-grad',
  templateUrl: './grad.component.html',
  styleUrls: ['./grad.component.css']
})
export class GradComponent implements OnInit {
  currentPage = 1;
  itemsPerPage = 10;
  pageSize!: number;
  public grad: Grad[] = [];
  closeResult:string='';
  grad2!: Grad;
  idGrada:number=0;
  currUser!: User;
  constructor(public _gradService: GradService, private modalService: NgbModal,
    private _korisnikService: UserService) {
      this._korisnikService.ucitajKorisnika().subscribe(res=> { this.currUser = this._korisnikService.currUser;  
        this._gradService.getGrad().subscribe(data=>{ this.grad = data.filter(obj=>obj.klijentId == this.currUser.klijentId);
        });
      });
      this.grad2=new Grad(); }

  ngOnInit(): void {
    
  }
  onSubmit(){
    this._gradService.addGrad(this.grad2).subscribe(data=>
        this._gradService.getGrad().subscribe(data=>{ this.grad = data.filter(obj=>obj.klijentId == this.currUser.klijentId);
        }));
  }
  updateGrad() {
    console.log(this.grad);
    this._gradService.updateGrad(this._gradService.formData.gradId, this._gradService.formData)
      .subscribe(data => this._gradService.getGrad().subscribe(res => { this.grad = []; this._gradService.getGrad().subscribe(data=>{ this.grad = data.filter(obj=>obj.klijentId == this.currUser.klijentId);
      }); }));
    this.ngOnInit();
  }

  DeleteGrad() {
    this._gradService.deleteGrad(this.idGrada)
    .subscribe(data => this.grad2 = data);
    return this._gradService.getGrad()
    .subscribe(
      (result)=>{
        this.grad = []; this._gradService.getGrad().subscribe(data => { this.grad = data.filter(obj=> obj.klijentId == this.currUser.klijentId);
        });
        this.ngOnInit();
        this.modalService.dismissAll();
      }
    );
  }
  public onPageChange(pageNum: number): void {

    this.pageSize = this.itemsPerPage*(pageNum - 1);

    }
/**Modal Add */
Add(content:any) {
  this.grad2 = new Grad();
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
/**Modal Update */

Update(content1:any, item:Grad) {
  this.idGrada=item.gradId;
  this._gradService.formData = Object.assign({},item);
  this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
/**Modal Delete */

Delete(content2:any, item:Grad) {
  console.log(item.gradId);
  this.idGrada=item.gradId;
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
