import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../authentication/authentication-service';
import { User } from '../models/user.model';
import { ClientService } from '../services/client.service';
import { UserService } from '../services/user.service';
import { Client } from '../models/client.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl:'./admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  closeResult:string="";
  currUser?: User;
  ImageM:any='';
  currClient?:Client;

  constructor(private _sanitizer: DomSanitizer,private _clientService:ClientService,private modalService: NgbModal, public service: AuthenticationService, private router: Router, private _korisnikService:UserService) {
    this._korisnikService.ucitajKorisnika().subscribe(res=> {
      this.currUser = this._korisnikService.currUser;
      this._clientService.getClientById(this._korisnikService.currUser?.klijentId).pipe(map(res => this.currClient = res)).subscribe(res => {
        this.ImageM= this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
        + atob(res.image!));
      });
   })
 }

  ngOnInit(): void {
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

  odjavi(){
    this.service.logout();
    this.router.navigate(['prijava/0']);
  }


}
