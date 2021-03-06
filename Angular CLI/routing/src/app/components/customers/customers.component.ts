import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: '/customers.component.html',
  styleUrls: ['/customers.component.css']
})
export class CustomersComponent implements OnInit {
  closeResult: string = '';
  currentPage = 1;
  itemsPerPage = 10;
  pageSize!: number;
  constructor(private modalService: NgbModal, private http: HttpClient, private router: Router, public service: CustomerService) { 
    this.service.get();
  }
  
  ngOnInit(): void {
  }
  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
    }
  resetForm() {
    this.service.formData = new Customer();
  }
  dodaj(){
    this.resetForm();
    if(this.service.customers.length > 0){
      this.service.formData.sifra = (Number.parseInt(this.service.customers[this.service.customers.length - 1].sifra!) + 1).toString();
    }
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
  filterPoNazivu(pretraga:any){
    //console.log(pretraga.value);
    this.service.getByName(pretraga.value);
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
