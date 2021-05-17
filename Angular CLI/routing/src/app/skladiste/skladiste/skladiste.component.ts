import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';
import { Skladiste } from 'src/app/models/skladiste.model';
import { User } from 'src/app/models/user.model';
import { SkladisteService } from 'src/app/services/skladiste.service';
import { UserService } from 'src/app/services/user.service';
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
  currUser!: User;
  currentPage = 1;
  itemsPerPage = 10;
  pageSize!: number;
  constructor(public _skladisteService: SkladisteService, private modalService: NgbModal,
    private _korisnikService: UserService) { 
      this._korisnikService.ucitajKorisnika().subscribe(res=> { this.currUser = this._korisnikService.currUser;  
        this._skladisteService.getSkladiste().subscribe(data=>{this.skladiste = data.filter(obj=>obj.klijentId == this.currUser.klijentId);
        });
      });
      this.skladiste2=new Skladiste();}

    ngOnInit(): void {
    }
    onSubmit(){
      this._skladisteService.addSkladiste(this.skladiste2)
      .subscribe(data=> this._skladisteService.getSkladiste().subscribe(data=>{this.skladiste = data.filter(obj=>obj.klijentId == this.currUser.klijentId);
      }) );
    }
    updateSkladiste() {
      this._skladisteService.updateSkladiste(this._skladisteService.formData.skladisteId, this._skladisteService.formData)
        .subscribe(data => this._skladisteService.getSkladiste().subscribe(res => { this.skladiste = []; this._skladisteService.getSkladiste().subscribe(data=>{this.skladiste = data.filter(obj=>obj.klijentId == this.currUser.klijentId);
        }); 
      }));
      this.ngOnInit();
    }
    DeleteSkladiste() {
      return this._skladisteService.deleteSkladiste(this.idSkladista)
      .subscribe((result)=>{
        this.skladiste = []; this._skladisteService.getSkladiste().subscribe(data => { this.skladiste = data.filter(obj=> obj.klijentId == this.currUser.klijentId);
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
    this.skladiste2 = new Skladiste();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  /**Modal Update */
  
  Update(content1:any, item:Skladiste) {
    this.idSkladista = item.skladisteId;
    this._skladisteService.formData=Object.assign({}, item);
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
  
