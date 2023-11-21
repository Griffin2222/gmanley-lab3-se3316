import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../../hero';


@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent  {
  @Input() hero!: Hero;


}
