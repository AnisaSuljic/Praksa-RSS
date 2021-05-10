import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../../../models/client.model';
import { ClientService } from '../../../services/client.service';
import { Customer } from '../../../models/customer.model';
import { Grad } from '../../../models/grad.model';
import { CustomerService } from '../../../services/customer.service';
import { GradService } from '../../../services/grad.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit{
  grad: Grad[] = [];
  constructor(public service: CustomerService, public serviceclient: ClientService, public servicegrad: GradService, private router: Router) {
    this.serviceclient.get();
    this.servicegrad.getGrad().subscribe(data=>this.grad=data);
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
    this.resetForm(form);
    form.reset();
    this.router.navigate(['/adminpanel/customers']);
  }

  insertRecord(form: NgForm) {
    this.service.postCustomer().subscribe(
      res => {
        this.service.get();
      }
    );
  }
  updateRecord(form: NgForm) {
    this.service.putCustomer().subscribe(
      res => {
        this.service.get();
      }
    );
  }
  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Customer();
  }
}
