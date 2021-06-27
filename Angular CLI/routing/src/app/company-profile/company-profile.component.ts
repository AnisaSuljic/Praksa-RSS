import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { event } from 'jquery';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/client.model';
import { User } from '../models/user.model';
import { ClientService } from '../services/client.service';
import { UserService } from '../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  currUser?: User;
  useri: User[] = [];
  currClient?: Client;
  currClient1?: Client;
  imageUrl:string='/assets/img/profile.png';
  fileToUpload:File=null as any;
  ImageM: any = '';

  constructor(private _sanitizer: DomSanitizer,private _clientService: ClientService, public _korisnikService: UserService) {
    this._korisnikService.ucitajKorisnika().subscribe(res=> {
      this.currUser = this._korisnikService.currUser;
      this._clientService.getClientById(this._korisnikService.currUser?.klijentId).pipe(map(res => this.currClient = res)).subscribe(res => {
        this.ImageM= this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
        + atob(res.image!));
       });
    })
  }
 

  ngOnInit(): void {
  }
imageChangedEvent: any = '';
  public base64Slika: string='';

  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64Slika = btoa(binaryString);
  }
  fileChangeEvent($event) {
    
    //this.imageChangedEvent = event;
    var file: File = $event.target.files[0];
    
    
    var reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    
    
    var reader1 = new FileReader();
    
    reader1.onload=(event:any)=>{
      this.ImageM=event.target.result;
    }
    reader1.readAsDataURL(file);
  }

  UpdateForImage() {

    this._clientService.getClientById(this.currUser?.klijentId).subscribe(f => {
      this.currClient1=f;
      this.currClient1.image=btoa(this.base64Slika);

      this._clientService.updateClient(f.klijentId as number,this.currClient1).subscribe(f => {
        location.reload()
      })
    });
    
  }
}
