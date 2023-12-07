import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
 
  

  private getAllURL = 'http://ec2-3-90-246-226.compute-1.amazonaws.com:3000/api/superheroes';

  //${searchName.value}&race=${searchRace.value}&publisher=${searchPublisher.value}&power=${searchPower.value}&limit=${searchLimit.value}

  async getHeroInfo(name:string, race:string, publisher:string, power:string, limit:number): Promise<Hero[]> {
    const queryParams = `/filter?name=${encodeURIComponent(name)}&race=${encodeURIComponent(race)}&publisher=${encodeURIComponent(publisher)}&power=${encodeURIComponent(power)}&limit=${encodeURIComponent(limit)}`;

  // Concatenate the parameters to the base URL
   const urlWithParams = this.getAllURL + queryParams;

  // Make the API request
    const data = await fetch(urlWithParams);
    return (await data.json()) ?? [];
  }


  async getHeroById(id: number): Promise<Hero | undefined> {
    const idNum = `/${id}`;
    const url = this.getAllURL + idNum;
    const data = await fetch(url);
    return (await data.json()) ?? [];
  }


  
}