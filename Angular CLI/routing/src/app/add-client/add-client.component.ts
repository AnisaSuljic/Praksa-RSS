import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../clients/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  constructor(public service: ClientService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (this.service.formData.klijentId == 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
    this.router.navigate(['/adminpanel/clients']);
  }

  insertRecord(form: NgForm) {
    this.service.postClient().subscribe(
      res => {
        this.service.getClients();
      }
      );
    }
    updateRecord(form: NgForm) {
      this.service.putClient().subscribe(
        res => {
        this.service.getClients();
      }
    );
  }
}
