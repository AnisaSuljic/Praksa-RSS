import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Manufacturer } from './manufacturer.model';
import { ManufacturerService } from './manufacturer.service';

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.css']
})
export class ManufacturersComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, public service: ManufacturerService) { }

  ngOnInit(): void {
    this.service.get();
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
        this.service.delete(x as number).subscribe(res => { this.service.get(); });
      }
  }
}
