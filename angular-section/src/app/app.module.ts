// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TitleComponent } from './heros/title/title.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './heros/main/main.component';
import { SearchComponent } from './heros/search/search.component';
import { ListComponent } from './heros/list/list.component';
import { ResultsComponent } from './heros/results/results.component';



@NgModule({
  declarations: [
TitleComponent, MainComponent, SearchComponent, ListComponent, ResultsComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
