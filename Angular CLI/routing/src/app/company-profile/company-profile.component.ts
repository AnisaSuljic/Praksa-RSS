import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/client.model';
import { User } from '../models/user.model';
import { ClientService } from '../services/client.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  currUser?: User;
  useri: User[] = [];
  currClient?: Client;
  constructor(private _clientService: ClientService, public _korisnikService: UserService) {
    this._korisnikService.ucitajKorisnika().subscribe(res=> {
      this.currUser = this._korisnikService.currUser;
      this._clientService.getClientById(this._korisnikService.currUser?.klijentId).pipe(map(res => this.currClient = res)).subscribe(res => { });
    })
  }

  ngOnInit(): void {
  }



}
