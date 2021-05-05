import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../models/client.model';
import { ClientService } from '../services/client.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  clients: Client[] = [];
  constructor(public service: UserService, public serviceclient: ClientService, private router: Router) { 
    this.serviceclient.get();
  }

  ngOnInit(): void {
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
    console.log(form.value);
    this.service.putUsers().subscribe(
      res => {
        this.service.get();
      }
    );
  }

}
