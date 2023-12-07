import { Injectable } from '@angular/core';
import { Power } from './power';

@Injectable({
  providedIn: 'root'
})
export class PowerService {

  private getAllURL = 'http://ec2-54-224-178-7.compute-1.amazonaws.com:3000/api/superheroes/powers/';

  async getPowers(heroName: string): Promise<Power[]> {
    const queryParams = `${heroName}`;
    const urlWithParams = this.getAllURL + queryParams;
  
    try {
      const response = await fetch(urlWithParams);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch powers for ${heroName}`);
      }
  
      const data = await response.json();
      const powers: Power[] = Object.entries(data)
        .filter(([key, value]) => key !== 'hero_names' && value === 'True')
        .map(([key, _]) => ({ name: key }));
  
      return powers;
    } catch (error) {
      console.error('Error fetching powers:', error);
      return [];
    }
  }
}
