import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { Customer } from '../../../models/customer.model';
import { Grad } from '../../../models/grad.model';
import { CustomerService } from '../../../services/customer.service';
import { GradService } from '../../../services/grad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit{
  grad: Grad[] = [];
  form!: Customer;
  _routerSub = Subscription.EMPTY;
  ifsubmit: boolean = true;
  constructor(public service: CustomerService, public serviceclient: ClientService, public servicegrad: GradService, private router: Router) {
    this.serviceclient.get();
    this.servicegrad.getGrad().subscribe(data => this.grad = data);
    this.form = Object.assign({}, this.service.formData);
    this._routerSub = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationStart) {
        if (this.ifsubmit) {
          if (this.canDeactivate()) {
            router.navigateByUrl(router.url, { replaceUrl: true });
          } else {
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

  canDeactivate(): boolean {
    if(JSON.stringify(this.form) !== JSON.stringify(this.service.formData)){
      if (confirm("You have unsaved changes! If you leave, your changes will be lost.")) {
        return false;
      } else {
        return true;
      }
    }else {
      return false;
    }
  }
  //aktivacija na refresh
  @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
      if(this.canDeactivate()){
        return false; // ako ima promjena returning false otvara dialog
      }return true; // ako nema promjena refresha
    }
  
  onSubmit(form: NgForm) {
    this.ifsubmit = false;
    if (this.service.formData.kupacId == 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
    this.resetForm(form);
    form.reset();
    this.router.navigate(['/adminpanel/customers']);
  }
  
  insertRecord(form: NgForm) {
    this.service.postCustomer().subscribe(
      res => {
        this.service.get();
      }
      );
    }
    updateRecord(form: NgForm) {
      this.service.putCustomer().subscribe(
        res => {
          this.service.get();
        }
    );
  }
  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Customer();
  }
  
  otkazi(form: NgForm){
    this.router.navigate(['/adminpanel/customers']);
  }
}
