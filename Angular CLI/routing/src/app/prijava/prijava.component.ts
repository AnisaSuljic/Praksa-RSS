import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { error } from 'selenium-webdriver';
import { AuthenticationService } from '../authentication/authentication-service';
import { Client } from '../models/client.model';
import { User } from '../models/user.model';
import { ClientService } from '../services/client.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl?: string;
  error = '';
  isError: boolean = false;
  user: User = new User();
  klijent: Client = new Client();
  useri: User[] = [];
  idklijenta?: string | null;
  constructor(private http: HttpClient, private router: Router, public service: UserService, public _klijentSerivice: ClientService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {

  }

  ngOnInit(): void {
    // this.loginForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required]
    //});
    this.route.paramMap.subscribe(params => { this.idklijenta = params.get('id'); })
    var result = this.idklijenta?.substring(1, this.idklijenta.length - 1);
    var num: number = parseInt(result!);
    if (num != 0) {
      this._klijentSerivice.getClientById(num).subscribe(res => { this.klijent = res });
    } else {
    }
    setTimeout(() => {
      this.klijent.isPotvrdjen = true;
    }, 5000);
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.loginForm?.invalid) {
    //     return;
    // }
    this.loading = true;
    localStorage.setItem('token', window.btoa(this.service.formData.korisnickoIme + ':' + this.service.formData.lozinka));
    this.authenticationService.login().subscribe(data => {
      this.useri = data as User[];
      for (let i = 0; i < this.useri.length; i++) {
        if (this.useri[i].korisnickoIme == this.service.formData.korisnickoIme) {
          localStorage.setItem('currentUser', JSON.stringify(this.useri[i]));//this.authenticationService.currentUser = this.useri[i]; 
        }
      }
      this.router.navigate(['/adminpanel/companyProfile']);
    }
      , error => { this.error = error; this.isError = true; });
  }
}
