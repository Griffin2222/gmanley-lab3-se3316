import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
 
  

  private getAllURL = 'http://localhost:3000/api/superheroes/';

  async getAllHeroInfo(): Promise<Hero[]> {
    const data = await fetch(this.getAllURL);
    return (await data.json()) ?? [];
  }

  async getHeroById(id: number): Promise<Hero[] | undefined> {
    const data = await fetch(`${this.getAllURL}/${id}`);
    return (await data.json()) ?? [];
  }


  
}