import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule, RoutingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { AddOutputsComponent } from './add-outputs/add-outputs.component';
import { EditOutputsComponent } from './edit-outputs/edit-outputs.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    AddOutputsComponent,
    EditOutputsComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
