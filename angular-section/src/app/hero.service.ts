import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  protected heroList: Hero[] = [
    {
      id: 8,
      name: "Agent 13",
      gender: "Female",
      eyeColor: "blue",
      race: "-",
      hairColor: "Blond",
      height: 173,
      publisher: "Marvel Comics",
      skinColor: "-",
      alignment: "good",
      weight: 61
    },
    {
      id: 4,
      name: "Abraxas",
      gender: "Male",
      eyeColor: "blue",
      race: "Cosmic Entity",
      hairColor: "Black",
      height: -99,
      publisher: "Marvel Comics",
      skinColor: "-",
      alignment: "bad",
      weight: -99
    }
  ]
  constructor(private http: HttpClient) { }

  private getAllURL = '/api/superheroes/';

  getAllHeroInfo(): Observable<Hero[]> {
    return this.http.get<Hero[]>('${this.getAllURL}/heroes');
  }

  getHeroById(id: number): Observable<Hero[] | undefined> {
    return this.http.get<Hero[]>(`${this.getAllURL}/heroes/${id}`);
  }


  
}