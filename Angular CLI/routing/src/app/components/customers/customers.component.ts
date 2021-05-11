import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: '/customers.component.html',
  styleUrls: ['/customers.component.css']
})
export class CustomersComponent implements OnInit {
  closeResult: string = '';

  constructor(private modalService: NgbModal, private http: HttpClient, private router: Router, public service: CustomerService) { 
    this.service.get();
  }

  ngOnInit(): void {
  }
  resetForm() {
    this.service.formData = new Customer();
  }
  dodaj(){
    this.resetForm();
    this.router.navigate(['/adminpanel/addcustomer']);
  }
  uredi(x: Customer) {
    this.service.formData = x;
    this.router.navigate(['/adminpanel/addcustomer']);
  }
  obrisi(x: number | undefined) {
      if (confirm('Jeste li sigurni?')) {
        this.service.deleteCustomer(x as number).subscribe(res => { this.service.get(); });
      }
  }

  /**Modal Add */
  Add(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  /**Modal Update */

  Update(content1: any) {
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  /**Modal Delete */

  Delete(content2: any) {
    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
