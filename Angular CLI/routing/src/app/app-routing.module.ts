import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInputsComponent } from './add-inputs/add-inputs.component';
import { AddOutputsComponent } from './add-outputs/add-outputs.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { CustomersComponent } from './customers/customers.component';
import { EditInputsComponent } from './edit-inputs/edit-inputs.component';
import { EditOutputsComponent } from './edit-outputs/edit-outputs.component';
import { GroupsComponent } from './groups/groups.component';
import { InputsComponent } from './inputs/inputs.component';
import { ItemsComponent } from './items/items.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { OutputsComponent } from './outputs/outputs.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ClientsComponent } from './clients/clients.component';
import { AddClientComponent } from './add-client/add-client.component';
import { ManufacturersComponent } from './manufacturers/manufacturers.component';
import { AddManufacturerComponent } from './add-manufacturer/add-manufacturer.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';




import { VrsteComponent } from './vrste/vrste.component';
import { GradComponent } from './grad/grad.component';
import { SkladisteComponent } from './skladiste/skladiste/skladiste.component';
import { PorezComponent } from './porez/porez/porez.component';
import { ArtiklComponent } from './artikl/artikl.component';



const routes: Routes = [
  {path: 'prijava', component: PrijavaComponent},
  {path: 'registracija', component:RegistracijaComponent},
  {path: 'adminpanel', component:AdminPanelComponent, children:[
{path:'companyProfile',component:CompanyProfileComponent},
{path: 'companyProfile', component:CompanyProfileComponent},
  {path: 'customers', component:CustomersComponent},
  {path: 'groups', component:GroupsComponent},
  {path: 'items', component:ItemsComponent},
  {path: 'inputs', component:InputsComponent},
  {path: 'outputs', component:OutputsComponent},

  {path: 'addcustomer', component:AddCustomerComponent},
  {path: 'clients', component:ClientsComponent},
  {path: 'addclient', component:AddClientComponent},
  {path: 'manufacturers', component:ManufacturersComponent},
  {path: 'addmanufacturer', component:AddManufacturerComponent},
  {path: 'users', component:UsersComponent},
  {path: 'adduser', component:AddUserComponent},

  {path: 'addInputs', component:AddInputsComponent},
  {path: 'editInputs', component:EditInputsComponent},
  {path: 'editInputs/:id', component:EditInputsComponent},
  {path: 'grad', component:GradComponent},
  {path: 'vrste', component:VrsteComponent},
  {path: 'skladiste', component:SkladisteComponent},
  {path: 'porez', component:PorezComponent},
  {path: 'artikl', component:ArtiklComponent},
  {path: 'addOutputs', component:AddOutputsComponent},
  {path: 'editOutputs', component:EditOutputsComponent},
  {path: 'editOutputs/:id', component:EditOutputsComponent}


]},
  {path: '', component:LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents=[PrijavaComponent,RegistracijaComponent,AdminPanelComponent,LandingPageComponent,CompanyProfileComponent,
  VrsteComponent, GradComponent, PorezComponent, SkladisteComponent, ArtiklComponent,
  AddCustomerComponent,ClientsComponent,AddClientComponent,
  ManufacturersComponent,AddManufacturerComponent,UsersComponent,AddUserComponent,CustomersComponent,GroupsComponent,ItemsComponent,InputsComponent,OutputsComponent,
  AddInputsComponent,EditInputsComponent]

