import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { QAComponent } from './q-a/q-a.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { Data } from './data';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    PageNotFoundComponent,
    QAComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(Data),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
