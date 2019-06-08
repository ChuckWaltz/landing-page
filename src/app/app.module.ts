import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgwWowModule } from 'ngx-wow';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgwWowModule.forRoot(),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
