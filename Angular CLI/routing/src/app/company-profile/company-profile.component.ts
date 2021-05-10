import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '../models/client.model';
import { User } from '../models/user.model';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-company-profile',
  templateUrl:'./company-profile.component.html',
  styleUrls: ['./company-profile.component.css'  ]
})
export class CompanyProfileComponent implements OnInit {
  currUser?: User;
  currClient?: Client;
  constructor(private _clientService: ClientService) {
    this.currUser = JSON.parse(localStorage.getItem('currentUser')!);
    _clientService.getClientById(this.currUser?.klijentId).subscribe(res=> this.currClient = res);
   }

  ngOnInit(): void {
  }
 

}
