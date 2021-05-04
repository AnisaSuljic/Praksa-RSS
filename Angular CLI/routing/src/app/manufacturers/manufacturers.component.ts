import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Client } from '../models/client.model';
import { Manufacturer } from '../models/manufacturer.model';
import { MyConfig } from '../my-config';
import { ClientService } from '../services/client.service';
import { ManufacturerService } from '../services/manufacturer.service';

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.css']
})
export class ManufacturersComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, public service: ManufacturerService, public serviceclient: ClientService) { }
  client!:Client;
  clients:Client[] = [];
  manufacturers:Manufacturer[]=[];
  readonly url:string = MyConfig.adresaServera + '/proizvodjac';

  ngOnInit(): void {
    this.service.get();
    this.serviceclient.get();
  }
  dodaj(){
    this.router.navigate(['/adminpanel/addmanufacturer']);
  }
  uredi(x: Manufacturer) {
    this.service.formData = x;
    this.router.navigate(['/adminpanel/addmanufacturer']);
  }
  obrisi(x: number | undefined) {
    if (confirm('Jeste li sigurni?')) {
        this.service.deleteManufacturer(x as number).subscribe(res => { this.service.get(); });
      }
    }
}

