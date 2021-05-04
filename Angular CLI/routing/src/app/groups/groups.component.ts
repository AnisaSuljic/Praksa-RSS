import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Groups } from '../models/grupe.model';
import { GroupsService } from '../services/groups.service';
import { data } from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { Porez } from '../models/porez.model';
import { PorezService } from '../services/porez.service';
import { Vrsta } from '../models/vrsta.model';
import { VrstaService } from '../services/vrsta.service';

@Component({
  selector: 'app-groups',
  templateUrl:'/groups.component.html',
  styleUrls:['/groups.component.css']
})
export class GroupsComponent implements OnInit {
  public grupe : Groups[] = [];
  porezi: Porez[]=[];
  vrste: Vrsta[]=[];
  closeResult:string='';
  grupa!: Groups;
  idgroup: number=0;
  uspjesnoDodavanje:boolean=false;
  private routeSub!:Subscription;
  constructor(private _groupService: GroupsService, private modalService: NgbModal, private router:Router, private _porezService:PorezService, private _vrstaService:VrstaService) 
  {
    this.grupa = new Groups();
   }

  ngOnInit(): void {
    this._groupService.getGroups().subscribe(data => this.grupe = data);
    this._porezService.getPorez().subscribe(data=> this.porezi = data);
    this._vrstaService.getVrsta().subscribe(data=> this.vrste = data);
console.log(this.grupa);
  }
  
  onSubmit(){
    this._groupService.addGroups(this.grupa).subscribe((result)=>{
      this.router.navigate(["/adminpanel/groups"]);
      this.uspjesnoDodavanje=true;
    });
  }
  Zatvori(){
    this.router.navigate(["/adminpanel/groups"]);
  }
  DeleteGroup() {
    this._groupService.deleteGroups(this.idgroup)
    .subscribe(data => this.grupa = data);
    return this._groupService.getGroups()
    .subscribe(
      (result)=>{
        this.ngOnInit();
        this.modalService.dismissAll();
      }
    );
  }
  updateGroups(){
    console.log(this.grupa);
    this._groupService.updateGroups(this.grupa.grupaId, this.grupa).subscribe(data => this.grupa = data);
    this.router.navigate([("/adminpanel/groups")]);
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

Delete(content2:any, item:Groups) {
  console.log(item.grupaId);
  this.idgroup=item.grupaId;
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
