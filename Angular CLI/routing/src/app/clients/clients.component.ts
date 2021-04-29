import { Component, OnInit } from '@angular/core';
import { Client } from './client.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ClientService } from './client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {


  constructor(private http: HttpClient, private router: Router, public service: ClientService) { }

  ngOnInit(): void {
    this.service.getClients();
  }
  uredi(x: Client) {
    this.service.formData = x;
    this.router.navigate(['/adminpanel/addclient']);
  }
  obrisi(x: number | undefined) {
    if (confirm('Jeste li sigurni?')) {
      this.service.deleteClient(x as number).subscribe(res => { this.service.getClients(); });
    }
  }

}
