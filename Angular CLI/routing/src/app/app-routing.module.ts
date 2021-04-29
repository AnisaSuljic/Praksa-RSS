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
  {path: 'addInputs', component:AddInputsComponent},
  {path: 'editInputs', component:EditInputsComponent},
  {path: 'editInputs/:id', component:EditInputsComponent},
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
  CustomersComponent,GroupsComponent,ItemsComponent,InputsComponent,OutputsComponent,AddInputsComponent,EditInputsComponent]
