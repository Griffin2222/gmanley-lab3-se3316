import { Component,OnInit, inject, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../title/title.component';
import { SearchComponent } from '../search/search.component';
import { ListComponent } from '../list/list.component';
import { ResultsComponent } from '../results/results.component';
import { Hero } from '../../hero';
import { HeroService } from '../../hero.service';
import { HttpClient } from '@angular/common/http';
import { Emitters } from '../../emitters/emitters';
import { application } from 'express';
import { subscribe } from 'diagnostics_channel';
import { Router } from '@angular/router';



@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [CommonModule, TitleComponent, SearchComponent, ListComponent, ResultsComponent ],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.css'
})

export class GuestComponent {
  authenticated = true;
  heroList: Hero[] = [];
  message: string;
  //heroService: HeroService = inject(HeroService);
  constructor(
    private heroService: HeroService,
     private renderer: Renderer2,
     private router: Router){
    
  }

    @ViewChild('searchName') searchNameInput!: ElementRef<HTMLInputElement>;
    @ViewChild('searchRace') searchRaceInput!: ElementRef<HTMLInputElement>;
    @ViewChild('searchPublisher') searchPublisherInput!: ElementRef<HTMLInputElement>;
    @ViewChild('searchPower') searchPowerInput!: ElementRef<HTMLInputElement>;
    @ViewChild('searchLimit') searchLimitInput!: ElementRef<HTMLInputElement>;
  
  
    search() {
      console.log('Search clicked!');
      this.fetchData(
        this.searchNameInput.nativeElement.value,
        this.searchRaceInput.nativeElement.value,
        this.searchPublisherInput.nativeElement.value,
        this.searchPowerInput.nativeElement.value,
        this.searchLimitInput.nativeElement.value
      );
    }
    
    fetchData(searchName: string, searchRace: string, searchPublisher: string, searchPower: string, searchLimit: string) {
      // Parse searchLimit to an integer using parseInt
      const limit = parseInt(searchLimit, 10);
    
      // Call the service to get data based on inputs
      this.heroService.getHeroInfo(searchName, searchRace, searchPublisher, searchPower, limit)
        .then((heroList: Hero[]) => {
          this.heroList = heroList;
        })
        .catch(error => {
          console.error('Error fetching hero data:', error);
        });
    }

    sort(sortType: string) {
      this.heroList.sort((a, b) => {
        let textA, textB;
  
        if (sortType === 'name') {
          textA = a.name.trim().toLowerCase();
          textB = b.name.trim().toLowerCase();
        } else if (sortType === 'race') {
          textA = a.race.trim().toLowerCase();
          textB = b.race.trim().toLowerCase();
        } else {
          textA = a.publisher.trim().toLowerCase();
          textB = b.publisher.trim().toLowerCase();
        }
        return textA.localeCompare(textB);
      });
    }

   

   
    

   

  }


