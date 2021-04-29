import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../clients/client.model';
import { ClientService } from '../clients/client.service';
import { ManufacturerService } from '../manufacturers/manufacturer.service';

@Component({
  selector: 'app-add-manufacturer',
  templateUrl: './add-manufacturer.component.html',
  styleUrls: ['./add-manufacturer.component.css']
})
export class AddManufacturerComponent implements OnInit {
  clients: Client[] = [];
  constructor(public service: ManufacturerService, public serviceclient: ClientService, private router: Router) {
    this.serviceclient.getClients();
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
}
