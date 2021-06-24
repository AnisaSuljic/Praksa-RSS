import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscriber, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Vrsta } from '../models/vrsta.model';
import { VrstaService } from '../services/vrsta.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-vrste',
  templateUrl: './vrste.component.html',
  styleUrls: ['./vrste.component.css']
})
export class VrsteComponent implements OnInit {
  public vrste: Vrsta[] = [];
  closeResult: string = '';
  vrsta!: Vrsta;
  idvrsta: number = 0;
  currUser!: User;
  currentPage = 1;
  itemsPerPage = 10;
  pageSize!: number;
  constructor(public _vrsteService: VrstaService, private modalService: NgbModal, private router: Router,
    private _korisnikService: UserService) {
    this._korisnikService.ucitajKorisnika().subscribe(res=> { this.currUser = this._korisnikService.currUser;
    this._vrsteService.getVrsta().subscribe(data => { this.vrste = data.filter(obj=> obj.klijentId == this.currUser.klijentId);
    }); 
    });
    this.vrsta = new Vrsta();
  }

  ngOnInit(): void {
    this.router.navigate(["/adminpanel/vrste"]);
  }
  onSubmit() {
    this._vrsteService.addVrsta(this.vrsta).subscribe(
      data => this._vrsteService.getVrsta().subscribe(data => { this.vrste = data.filter(obj=> obj.klijentId == this.currUser.klijentId);
      })
    );
  }
  updateVrsta() {
    this._vrsteService.updateVrsta(this._vrsteService.formData.vrstaId, this._vrsteService.formData)
      .subscribe(data => this._vrsteService.getVrsta().subscribe(res => { this.vrste = []; this._vrsteService.getVrsta().subscribe(data => { this.vrste = data.filter(obj=> obj.klijentId == this.currUser.klijentId);
      }); }));
    this.ngOnInit();
  }

  DeleteVrsta() {
    this._vrsteService.deleteVrsta(this.idvrsta)
      .subscribe(data => this.vrsta = data);
    return this._vrsteService.getVrsta()
      .subscribe(
        (result) => {
          this.vrste = []; this._vrsteService.getVrsta().subscribe(data => { this.vrste = data.filter(obj=> obj.klijentId == this.currUser.klijentId);
          });
          this.ngOnInit();
          this.modalService.dismissAll();
        }
      );
  }
  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
    }
    filterPoNazivu(pretraga:any){
      this._vrsteService.getVrsta().subscribe(data=> this.vrste=data.filter(fil=> fil.naziv.toLowerCase()?.includes(pretraga.value.toLowerCase())));
    }
  /**Modal Add */
  Add(content: any) {
    this.vrsta = new Vrsta();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  /**Modal Update */

  Update(content1: any, item: Vrsta) {
    this.idvrsta = item.vrstaId;
    this._vrsteService.formData = Object.assign({}, item);
    console.log(this._vrsteService.formData.naziv);
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  /**Modal Delete */

  Delete(content2: any, item: Vrsta) {
    this.idvrsta = item.vrstaId;
    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
