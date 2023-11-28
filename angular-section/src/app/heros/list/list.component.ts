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
  showFeedback: boolean = false;
  

  constructor(private listService: ListService, private heroService: HeroService, private userService: UserService){
    this.populateDropdown();
    this.populateUsers();
  
  }

  async createList(listN: string, visibility: boolean, additionalInfo: string) {
    try {
      const listName = listN;
      const owner = "Griffin"
      const rating: number[] = [5];
      const comment: string[] = ["helo"];
      const idsList = this.heroList.map(hero => hero.id.toString());
      const response = await this.listService.createList(listName, idsList,owner, visibility, rating, comment, additionalInfo );
      console.log('List created:', response);
      console.log(`HeroList:`, this.heroList);
      this.populateDropdown();
    } catch (error) {
      console.error('Error creating list:', error);
    }
  }

  async saveList(selectedIndex: number, listN: string, visibility: boolean,  additionalInfo:string) {
    try {
      const listName = listN;
      const owner = "Griffin";
      const rating :number[] = [];
      const comment:string[] = [];
      const idsList = this.heroList.map(hero => hero.id.toString());
      const response = await this.listService.saveList(selectedIndex, listName, idsList, owner, visibility, rating, comment, additionalInfo);
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
  extractListName(obj: any): string {
    if (obj && obj.listName) {
      return obj.listName;
    } else {
      // Handle the case when listName is not present or undefined
      return '';
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
      this.populateUsersLists(userName);
    }catch(error){
      console.log("Error finding user", error);
    }
  }
  async populateUsersLists(userName:string){
    try {
      this.usersLists = await this.listService.getUserList(userName);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  }

  async submitComment(name:string, comment:string, rating:string){
    const commentArr = [];
    commentArr.push(comment);
    const ratingArr: number [] = [];
    ratingArr.push(parseInt(rating));
    console.log(name);
    try{
      await this.listService.updateRating(name, ratingArr, commentArr)
    }catch(error){
      console.error("error adding comment", error)
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
    this.clearList();
    try {
      const selectedLists = await this.listService.getListByName(name); // create method to get list by name
      const selectedList = this.extractIdsFromObject(selectedLists); // Assuming you want the first list
      await this.getHeroes(selectedList);
      console.log(selectedLists);
      this.showFeedback = true;
    } catch (error) {
      console.error('Error selecting list:', error);
    }
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
