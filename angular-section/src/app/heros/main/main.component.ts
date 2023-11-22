import { Component,OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../title/title.component';
import { SearchComponent } from '../search/search.component';
import { ListComponent } from '../list/list.component';
import { ResultsComponent } from '../results/results.component';
import { Hero } from '../../hero';
import { HeroService } from '../../hero.service';



@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, TitleComponent, SearchComponent, ListComponent, ResultsComponent ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  heroList: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getAllHeroInfo().subscribe(
      (heroes: Hero[]) => {
        this.heroList = heroes;
      },
      error => {
        console.error('Error loading heroes:', error);
        // Handle errors as needed
      }
    );
  }
}
