import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../title/title.component';
import { SearchComponent } from '../search/search.component';
import { ListComponent } from '../list/list.component';
import { ResultsComponent } from '../results/results.component';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'], // Use styleUrls instead of styleUrl
  imports: [
    TitleComponent, SearchComponent, ListComponent, ResultsComponent,
  ],
  
})


export class MainComponent {

}
