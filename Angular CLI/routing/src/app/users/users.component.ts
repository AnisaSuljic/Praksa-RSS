import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication-service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  loginForm?: FormGroup;
  loading = false;
  submitted = false;
  returnUrl?: string;
  error = '';
  user: User = new User();

  constructor(private http: HttpClient, private router: Router, public service: UserService, public serviceuser: UserService) {  }

  ngOnInit(): void {
    this.service.get();
  }
  

  dodaj() {
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
