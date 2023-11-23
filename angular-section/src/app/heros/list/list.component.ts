import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListService } from '../../list.service';
import { Hero } from '../../hero';
import { HeroService } from '../../hero.service';
import { List } from '../../list';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  @ViewChild('listName') listNameInput!: ElementRef<HTMLInputElement>;
  @Input() heroList: Hero[] = [];
  lists: List[] = [];
  selectedList: List[] = [];

  constructor(private listService: ListService, private heroService: HeroService){
    this.populateDropdown();
  }

  async createList(listN: string) {
    try {
      const listName = listN;
      const idsList = this.heroList.map(hero => hero.id.toString());
      const response = await this.listService.createList(listName, idsList);
      console.log('List created:', response);
      console.log(`HeroList:`, this.heroList);
    } catch (error) {
      console.error('Error creating list:', error);
    }
  }

  async populateDropdown() {
    try {
      this.lists = await this.listService.getLists();
      this.updateDropdown();
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  }


  async selectList(index: number) {
    console.log('indexc', index);
    try {
      const selectedLists = await this.listService.getList(index + 1);
      if (selectedLists && Array.isArray(selectedLists) && selectedLists.length > 0) {
        const selectedList = selectedLists[1]; // Assuming you want the first list
        if (Array.isArray(selectedList.ids)) {
          await this.getHeroes(selectedList.ids);
        }
      }
      console.log(selectedLists);
    } catch (error) {
      console.error('Error selecting list:', error);
    }
  }
  
  private async getHeroes(ids: string[]) {
    for (const id of ids) {
      try {
        const hero = await this.heroService.getHeroById(parseInt(id, 10)); // Assuming id is a number
        console.log('Hero details:', hero?.name);
        // Do something with the hero details
      } catch (error) {
        console.error('Error fetching hero details:', error);
      }
    }
  }
  updateDropdown(){

  }
}
