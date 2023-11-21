import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  @ViewChild('searchBtn') searchBtn!: ElementRef;
  @ViewChild('newListBtn') newListBtn!: ElementRef;
  @ViewChild('deleteListBtn') deleteListBtn!: ElementRef;
  @ViewChild('sortListDrop') sortListDrop!: ElementRef;
  @ViewChild('sortListBtn') saveListBtn!: ElementRef;

  searchResults: any[] =[];

  constructor(private http: HttpClient) {}

  getHeroes(searchName: string, searchRace: string, searchPublisher: string, searchPower: string, searchLimit: string) {
    this.clearResults();

    this.http.get<any[]>(`/api/superheroes/filter`, {
      params: {
        name: searchName,
        race: searchRace,
        publisher: searchPublisher,
        power: searchPower,
        limit: searchLimit,
      },
    })
    .subscribe(
      (data) => {
        this.processHeroes(data);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

private processHeroes(data: any[]) {
    data.forEach(hero => {
      // Process and display heroes
      // ...

      this.searchResults.push(hero); // Store data in the component property
    });

    this.enableButtons(); // Enable buttons after processing
  }

private enableButtons() {
    this.newListBtn.nativeElement.disabled = false;
    this.saveListBtn.nativeElement.disabled = false;
    this.sortListDrop.nativeElement.disabled = false;
  }

capitalize(phrase: string) {
  phrase = String(phrase).split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return phrase.replace(/([a-z])([A-Z])/g, '$1 $2');
}
clearResults() {
  this.searchResults = [];
  }

getAllPublishers() {
  console.log('get all publishers')
}
}


