import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../authentication/authentication-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  currUser!: User;
  userObs!: Observable<boolean>;
  currentPage = 1;
  itemsPerPage = 10;
  pageSize!: number;
  constructor(private http: HttpClient, private router: Router, public service: UserService, public serviceuser: UserService) {
    this.serviceuser.ucitajKorisnika().subscribe(res => {
      this.currUser = this.serviceuser.currUser;
      this.service.get();
      this.userObs = serviceuser.getUserById(this.currUser.korisnikId!).pipe(map(res=> { return res.isAdmin; } ));
    });
  }

  ngOnInit(): void {
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
    }
  dodaj() {
    this.service.formData = Object.assign({}, new User());
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
