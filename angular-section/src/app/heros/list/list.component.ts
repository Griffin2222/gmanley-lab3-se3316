import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  @ViewChild('listName') listNameInput!: ElementRef<HTMLInputElement>;


  newList(listName:string){
    console.log('listName:',listName)
  }
  saveList(listName:string){
    console.log('listName:',listName)
  }
}
