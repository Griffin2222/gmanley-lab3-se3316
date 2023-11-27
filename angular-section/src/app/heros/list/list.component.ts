import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListService } from '../../list.service';
import { Hero } from '../../hero';
import { HeroService } from '../../hero.service';
import { List } from '../../list';
import { User } from '../../user';
import { UserService } from '../../user.service';
import { Injectable } from '@angular/core';

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
  users: User[] = [];
  @Input() hero!: Hero;
  selectedUser: User[] = [];
  usersLists: List[] = [];

  constructor(private listService: ListService, private heroService: HeroService, private userService: UserService){
    this.populateDropdown();
    this.populateUsers();
  }

  async createList(listN: string) {
    try {
      const listName = listN;
      const idsList = this.heroList.map(hero => hero.id.toString());
      const response = await this.listService.createList(listName, idsList);
      console.log('List created:', response);
      console.log(`HeroList:`, this.heroList);
      this.populateDropdown();
    } catch (error) {
      console.error('Error creating list:', error);
    }
  }

  async saveList(selectedIndex: number, listN: string) {
    try {
      const listName = listN;
      const idsList = this.heroList.map(hero => hero.id.toString());
      const response = await this.listService.saveList(selectedIndex, listName, idsList);
      console.log('List created:', response);
      console.log(`HeroList:`, this.heroList);
      this.populateDropdown();
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
  extractIdsFromObject(obj: any): string[] {
    if (obj && obj.ids && Array.isArray(obj.ids)) {
      return obj.ids.map((id:any) => id.toString());
    } else {
      return [];
    }
  }

  async populateUsers(){
    try{
      this.users = await this.userService.getUsers();
      this.updateDropdown();
    }catch(error){
      console.log('Error fetching users', error);
    }
  }

  async selectUser(userName:string){
    try{
      this.selectedUser = await this.userService.getUser(userName);
      this.updateDropdown();
      console.log(this.selectedUser);
    }catch(error){
      console.log("Error finding user", error);
    }
  }

  async selectList(index: number) {
    this.clearList();
    console.log('indexc', index);
    try {
      const selectedLists = await this.listService.getList(index + 1); 
      const selectedList = this.extractIdsFromObject(selectedLists); // Assuming you want the first list
      await this.getHeroes(selectedList);
      console.log(selectedLists);
    } catch (error) {
      console.error('Error selecting list:', error);
    }
  }

  async selectUserList(name:string){
    console.log(name);
  }

  async deleteList(index : number, listName: string): Promise<void>{
    console.log('index', index);
    try{
      await this.listService.deleteList(index+1, listName);
      this.populateDropdown();
    }catch (error){
      console.error(`Error deleting lists`, error);
    }
  }
  
  private async getHeroes(ids: string[]) {
    for (const id of ids) {
      try {
        const hero = await this.heroService.getHeroById(parseInt(id, 10)); // Assuming id is a number
        
        if(hero){
        console.log('Hero details:', hero.name);
        this.heroList.push(hero);
        }
        // Do something with the hero details
      } catch (error) {
        console.error('Error fetching hero details:', error);
      }
    }
  }
  updateDropdown(){

  }
  clearList(){
    this.heroList.length = 0;
  }
}
