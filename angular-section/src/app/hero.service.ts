import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
 
  

  private getAllURL = 'http://localhost:3000/api/superheroes';

  //${searchName.value}&race=${searchRace.value}&publisher=${searchPublisher.value}&power=${searchPower.value}&limit=${searchLimit.value}

  async getHeroInfo(name:string, race:string, publisher:string, power:string, limit:number): Promise<Hero[]> {
    const queryParams = `/filter?name=${encodeURIComponent(name)}&race=${encodeURIComponent(race)}&publisher=${encodeURIComponent(publisher)}&power=${encodeURIComponent(power)}&limit=${encodeURIComponent(limit)}`;

  // Concatenate the parameters to the base URL
   const urlWithParams = this.getAllURL + queryParams;

  // Make the API request
    const data = await fetch(urlWithParams);
    return (await data.json()) ?? [];
  }


  async getHeroById(id: number): Promise<Hero[] | undefined> {
    const data = await fetch(`${this.getAllURL}/${id}`);
    return (await data.json()) ?? [];
  }


  
}