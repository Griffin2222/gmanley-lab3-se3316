import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../hero.service';
import { ResultsComponent } from '../results/results.component';
import { RouterModule } from '@angular/router';
import { PowerService } from '../../power.service';
import { Power } from '../../power';

@Component({
  selector: 'app-detailsGuest',
  standalone: true,
  imports: [CommonModule, ResultsComponent, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  heroService: HeroService = inject(HeroService);
  hero: Hero | undefined;
  powerService: PowerService = inject(PowerService)
  powers: Power[] = [];
  


  

constructor(private resultsComponent: ResultsComponent){
  const heroId = parseInt(this.resultsComponent.id, 10);
   this.heroService.getHeroById(heroId).then((hero) => {
      this.hero = hero;

      if(this.hero){
        this.powerService.getPowers(this.hero.name).then((powers: Power[])=>{
          this.powers = powers;
          console.log(this.powers);
        })

      }
    });

  
  }
  }
