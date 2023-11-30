import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../../hero';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-resultsGuest',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent  {
  @Input() hero!: Hero;
  

  


}
