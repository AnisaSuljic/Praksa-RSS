import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Client } from '../../../models/client.model';
import { User } from '../../../models/user.model';
import { ClientService } from '../../../services/client.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  clients: Client[] = [];
  useri: User[] = [];
  currUser?: User;
  currClient?: Client;
  isAvailable:boolean=true;
  form!: User;
  _routerSub = Subscription.EMPTY;
  ifsubmit: boolean = true;
  constructor(public service: UserService, public serviceclient: ClientService, private router: Router) { 
    this.serviceclient.get();
    //this.currUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.service.ucitajKorisnika().subscribe(res=> {
      this.currUser = this.service.currUser;
      serviceclient.getClientById(this.currUser?.klijentId).subscribe(res=> this.currClient = res);
    });
    this.service.getUsers().subscribe(res=> this.useri = res);
    this.form = Object.assign({},this.service.formData);
    this._routerSub = this.router.events.subscribe((ev) => {
      if(this.ifsubmit){ //ifsubmit ce biti false samo ako je obavljen poziv onSubmit
        if(ev instanceof NavigationStart){ //poziva se na bilo koji pozvani url
          if(this.canDeactivate()){
            router.navigateByUrl(router.url, { replaceUrl: true });
          }else{
          }
      }
      }
    });
  }
  ngOnInit(): void {
  }
  ngOnDestroy() {
    this._routerSub.unsubscribe();
  }
  canDeactivate(): boolean { //provjera promjena na formi
    if(JSON.stringify(this.form) !== JSON.stringify(this.service.formData)){ //uporedjivanje pocetnih podatakla na pocetku i na kraju izmjena ako ih je bilo
      if (confirm("You have unsaved changes! If you leave, your changes will be lost.")) {
        return false;
      } else {
        return true;
      }
    }else {
      return false;
    }
  }
  //aktivacija metoda na refresh
  @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
      if(this.canDeactivate()){
        return false; // ako ima promjena returning false otvara dialog
      }return true; // ako nema promjena refresha
    }
  onSubmit(form: NgForm) {
    this.ifsubmit = false;
    if (this.service.formData.korisnikId == 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
    form.reset();
    this.router.navigate(['/adminpanel/users']);
  }

  insertRecord(form: NgForm) {
    this.service.postUsers().subscribe(
      res => {
        this.service.get();
      }
    );
  }
  updateRecord(form: NgForm) {
    this.service.putUsers().subscribe(
      res => {
        this.service.get();
      }
    );
  }
  provjeri(){
    this.isAvailable = this.useri.filter(item=> this.service.formData.korisnickoIme == item.korisnickoIme).length == 0 ? true: false;
  }
}
