import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../clients/client.model';
import { ClientService } from '../clients/client.service';
import { Customer } from '../customers/customer.model';
import { CustomerService } from '../customers/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit{
  clients: Client[] = [];
  constructor(public service: CustomerService, public serviceclient: ClientService, private router: Router) {
    this.serviceclient.getClients();
    //console.log(this.serviceclient.clients);
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.kupacId == 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
    // if (this.crudservice.formData[0].kupacId == 0) {
    //   this.insertRecord(form);
    // }
    // else {
    //   this.updateRecord(form, this.crudservice.formData[0].kupacId as number);
    // }
    this.resetForm(form);
    form.reset();
    this.router.navigate(['/adminpanel/customers']);
  }

  insertRecord(form: NgForm) {
    this.service.post().subscribe(
      res => {
        this.service.get();
      }
    );
  }
  updateRecord(form: NgForm) {
    console.log(form.value);
    this.service.put().subscribe(
      res => {
        this.service.get();
      }
    );
  }
  // insertRecord(form: NgForm) {
  //   this.crudservice.post().subscribe(
  //     res => {
  //       this.service.get();
  //     }
  //   );
  // }
  // updateRecord(form: NgForm, id: number) {
  //   this.crudservice.put(id).subscribe(
  //     res => {
  //       this.crudservice.get();
  //     });
  // }
  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Customer();
  }
}
