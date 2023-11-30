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
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, TitleComponent, SearchComponent, ListComponent, ResultsComponent ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent{
  authenticated = true;
  heroList: Hero[] = [];
  message: string;
  userName: string;
  //heroService: HeroService = inject(HeroService);
  constructor(
    private heroService: HeroService,
     private renderer: Renderer2,
     private router: Router){
    this.verifyUser();
  }
  ngOnInit(): void{
    this.verifyUser();
    Emitters.authEmitter.subscribe((auth:boolean)=>{
      this.authenticated = auth;
    })
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
    resetPword(){
      this.router.navigate(['/resetPword']);
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

    private url = "http://localhost:3000/api/superheroes/";

    async verifyUser(): Promise<void> {
      const idName = `user`;
      const thisurl = this.url + idName;
    
      try {
        const response = await fetch(thisurl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
    
        if (response.ok) {
          const userData = await response.json();
          this.message = `Hi ${userData.name}`;
          this.userName = userData.name;
          Emitters.authEmitter.emit(true);
        } else {
          this.message = 'You are not logged in';
          Emitters.authEmitter.emit(false);
          console.log('You are not logged in');
          this.router.navigate(['/login']);
        }
      } catch (error) {
        console.error('Error during user verification:', error);
        // Handle the error, update the UI, etc.
      }
    }
    

    async logout(): Promise<void>{
      const idName = `logout`;
      const thisurl = this.url + idName;
      try{
        const response = await fetch(thisurl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        }).then(
          ()=> {
            this.authenticated = false;
            this.router.navigate(['/login']);
          })
      }catch(error){
        console.log("error")
      }
    }

  }

