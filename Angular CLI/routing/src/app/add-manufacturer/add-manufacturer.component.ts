import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../models/client.model';
import { ClientService } from '../services/client.service';
import { ManufacturerService } from '../services/manufacturer.service';

@Component({
  selector: 'app-add-manufacturer',
  templateUrl: './add-manufacturer.component.html',
  styleUrls: ['./add-manufacturer.component.css']
})
export class AddManufacturerComponent implements OnInit {
  clients: Client[] = [];
  constructor(public service: ManufacturerService, public serviceclient: ClientService, private router: Router) {
    this.serviceclient.get();
   }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    if (this.service.formData.proizvodjacId == 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
    this.router.navigate(['/adminpanel/manufacturers']);
  }
  insertRecord(form: NgForm) {
    this.service.postManufacturer().subscribe(
      res => {
        this.service.get();
      }
    );
  }
  updateRecord(form: NgForm) {
    console.log(form.value);
    this.service.putManufacturer().subscribe(
      res => {
        this.service.get();
      }
    );
  }
}
