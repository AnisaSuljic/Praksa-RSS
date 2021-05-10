import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../../../models/client.model';
import { User } from '../../../models/user.model';
import { ClientService } from '../../../services/client.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  clients: Client[] = [];
  currUser?: User;
  currClient?: Client;
  constructor(public service: UserService, public serviceclient: ClientService, private router: Router) { 
    this.serviceclient.get();
    this.currUser = JSON.parse(localStorage.getItem('currentUser')!);
    serviceclient.getClientById(this.currUser?.klijentId).subscribe(res=> this.currClient = res);
  }
  ngOnInit(): void {
    this.service.formData = new User();
  }
  onSubmit(form: NgForm) {
    if (this.service.formData.korisnikId == 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
    form.reset();
    this.router.navigate(['/adminpanel/users']);
  }

  insertRecord(form: NgForm) {
    this.service.postUsers().subscribe(
      res => {
        this.service.get();
      }
    );
  }
  updateRecord(form: NgForm) {
    this.service.putUsers().subscribe(
      res => {
        this.service.get();
      }
    );
  }

}
