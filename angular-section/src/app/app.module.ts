// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TitleComponent } from './heros/title/title.component';



@NgModule({
  declarations: [
TitleComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
