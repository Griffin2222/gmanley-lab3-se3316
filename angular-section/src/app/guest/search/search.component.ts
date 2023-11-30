import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../../hero';
import { ResultsComponent } from '../results/results.component';

@Component({
  selector: 'app-searchGuest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @ViewChild('searchName') searchNameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('searchRace') searchRaceInput!: ElementRef<HTMLInputElement>;
  @ViewChild('searchPublisher') searchPublisherInput!: ElementRef<HTMLInputElement>;
  @ViewChild('searchPower') searchPowerInput!: ElementRef<HTMLInputElement>;
  @ViewChild('searchLimit') searchLimitInput!: ElementRef<HTMLInputElement>;


  search(searchName: string, searchRace: string, searchPublisher: string, searchPower: string, searchLimit: string) {
    console.log('Search clicked!');
    console.log('Name:', searchName);
    console.log('Race:', searchRace);
    console.log('Publisher:', searchPublisher);
    console.log('Power:', searchPower);
    console.log('Limit:', searchLimit);
    // Implement your search logic here

  }

}
