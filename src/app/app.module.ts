import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/material.module';
import { HomeComponent } from './pages-archive/home/home.component';
import { AboutUsComponent } from './pages-archive/about-us/about-us.component';
import { PageNotFoundComponent } from './pages-archive/page-not-found/page-not-found.component';
import { QAComponent } from './pages-archive/q-a/q-a.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { Data } from './data-and-extraction/data';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations:
  [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    PageNotFoundComponent,
    QAComponent,
  ],
  imports:
  [
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
