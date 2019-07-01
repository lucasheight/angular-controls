import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {LhControlsModule} from "@lucasheight/angular-controls"
import {LhControlsModule} from "../../projects/lh-controls/src/lib/lh-controls.module"

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LhControlsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
