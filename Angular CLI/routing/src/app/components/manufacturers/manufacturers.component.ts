import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '../../models/client.model';
import { Manufacturer } from '../../models/manufacturer.model';
import { MyConfig } from '../../my-config';
import { ClientService } from '../../services/client.service';
import { ManufacturerService } from '../../services/manufacturer.service';

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.css']
})
export class ManufacturersComponent implements OnInit{
  client!: Client;
  clients: Client[] = [];
  manufacturers: Manufacturer[] = [];
  manufacturer!: Manufacturer;
  closeResult: string = '';
  form!: Manufacturer;
  currentPage = 1;
  itemsPerPage = 10;
  pageSize!: number;
  readonly url: string = MyConfig.adresaServera + '/proizvodjac';
  constructor(private modalService: NgbModal, private http: HttpClient, private router: Router, 
    public service: ManufacturerService, public serviceclient: ClientService) {
      this.manufacturer = new Manufacturer();
      this.service.get();
      //this.serviceclient.get();
    }
 
  ngOnInit(): void {
  }
  onSubmit() {
    this.service.postManufacturer(this.manufacturer!).subscribe(data =>
      this.service.get());
  }
  uredi() {
    this.service.putManufacturer(this.service.formData.proizvodjacId!, this.service.formData)
      .subscribe(data => this.service.get());
    this.ngOnInit();
  }
  obrisi() {
    this.service.deleteManufacturer(this.manufacturer.proizvodjacId!)
      .subscribe(res => { this.manufacturer = res });
    return this.service.getManufacturers().subscribe(res => {
      this.ngOnInit();
      this.modalService.dismissAll();
    })
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
  public onPageChange(pageNum: number): void {

    this.pageSize = this.itemsPerPage*(pageNum - 1);
    
    }
  /**Modal Add */
  Add(content: any) {
    this.manufacturer = new Manufacturer();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  /**Modal Update */

  Update(content1: any, item: Manufacturer) {
    this.service.formData = Object.assign({}, item);
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }
  /**Modal Delete */

  Delete(content2: any, item: Manufacturer) {
    this.manufacturer = item;
    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
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
  private beforeDismiss(reason: any): void {
    this.canDeactivate();
  }
}

