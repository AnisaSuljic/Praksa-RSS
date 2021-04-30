import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Groups } from '../models/grupe.model';
import { GroupsService } from '../services/groups.service';
import { data } from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-groups',
  templateUrl:'/groups.component.html',
  styleUrls:['/groups.component.css']
})
export class GroupsComponent implements OnInit {
  public grupe : Groups[] = [];
  closeResult:string='';
  grupa!: Groups;
  idgroup: number=0;
  private routeSub!:Subscription;
  constructor(private _groupService: GroupsService, private modalService: NgbModal, private route:ActivatedRoute) 
  {
    this.grupa = new Groups();
   }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params=>{this.idgroup=params['id']});
    this._groupService.getGroups().subscribe(data => this.grupe = data);
console.log(this.grupa);
  }
  
  onSubmit(){
    this._groupService.addGroups(this.grupa).subscribe(data=> this.grupe = data);
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
  console.log(item.id);
  this.idgroup=item.id;
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
