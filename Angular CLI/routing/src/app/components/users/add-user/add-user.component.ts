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
  useri: User[] = [];
  currUser?: User;
  currClient?: Client;
  isAvailable:boolean=true;
  constructor(public service: UserService, public serviceclient: ClientService, private router: Router) { 
    this.serviceclient.get();
    //this.currUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.service.ucitajKorisnika().subscribe(res=> {
      this.currUser = this.service.currUser;
      serviceclient.getClientById(this.currUser?.klijentId).subscribe(res=> this.currClient = res);
    });
    this.service.getUsers().subscribe(res=> this.useri = res);
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
  provjeri(){
    this.isAvailable = this.useri.filter(item=> this.service.formData.korisnickoIme == item.korisnickoIme).length == 0 ? true: false;
  }
}
