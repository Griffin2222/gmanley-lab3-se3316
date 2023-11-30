import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../../hero';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DetailsComponent } from '../details/details.component';


@Component({
  selector: 'app-resultsGuest',
  standalone: true,
  imports: [CommonModule, RouterModule, DetailsComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent  {
  @Input() hero!: Hero;
  id:string;
  show=false;

  expand(){
    this.id=String(this.hero.id);
    console.log(this.id)
    this.show=true;
  }
  

  


}
