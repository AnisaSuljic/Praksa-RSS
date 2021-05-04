import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, public service: UserService) { }

  ngOnInit(): void {
    this.service.get();
  }
  dodaj(){
    this.router.navigate(['/adminpanel/adduser']);
  }
  uredi(x: User) {
    this.service.formData = x;
    this.router.navigate(['/adminpanel/adduser']);
  }
  obrisi(x: number | undefined) {
      if (confirm('Jeste li sigurni?')) {
        this.service.deleteUsers(x as number).subscribe(res => { this.service.get(); });
      }
  }

}
