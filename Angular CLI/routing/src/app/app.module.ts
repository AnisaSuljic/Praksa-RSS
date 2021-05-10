import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule, RoutingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtiklComponent } from './artikl/artikl.component';
import { AddOutputsComponent } from './add-outputs/add-outputs.component';
import { EditOutputsComponent } from './edit-outputs/edit-outputs.component';
import { EditStavkaComponent } from './edit-stavka/edit-stavka.component';
import { BasicAuthInterceptor } from './interceptors/basic-auth-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    ArtiklComponent,
    AddOutputsComponent,
    EditOutputsComponent,
    EditStavkaComponent,
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
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi:true},
              { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
