import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../title/title.component';
import { SearchComponent } from '../search/search.component';
import { ListComponent } from '../list/list.component';
import { ResultsComponent } from '../results/results.component';
import { Hero } from '../../hero';



@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, TitleComponent, SearchComponent, ListComponent, ResultsComponent ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  heroList: Hero [] =[{
    id: 1,
    name: 'batman',
    gender: 'male',
    eyeColor: 'blue',
    race: 'human',
    hairColor: 'brown',
    height: 6,
    publisher: 'DC',
    skinColor: 'white',
    alignment: 'good guy',
    weight: 69,
    },{
      id: 2,
      name: 'bat',
      gender: 'male',
      eyeColor: 'blue',
      race: 'human',
      hairColor: 'brown',
      height: 6,
      publisher: 'DC',
      skinColor: 'white',
      alignment: 'good guy',
      weight: 69,
      }]
}
