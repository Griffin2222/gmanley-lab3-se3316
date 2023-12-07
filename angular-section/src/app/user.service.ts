import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from './user';
import { response } from 'express';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:3000/api/superheroes/";

  async registerUser(email:string, name:string, password:string): Promise<any>{
    const user = {name: name, email: email,  password: password };
    const idName = `register`;
    const thisurl = this.url + idName;
    try {
      const response = await fetch(thisurl, {
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify(user),
      });
      return response.json();
    } catch (error) {
      throw error;
    }
  }
  async login(email:string, password: string): Promise<any>{
    const user= {email: email, password: password};
    const idName = `login`;
    const thisurl = this.url+idName;
    try{
      const response = await fetch(thisurl, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(user),
      });
      return response.json();
    }catch(error){
      throw(error);
    }
  }

  async verifyEmail(token:string): Promise<any>{
 
    const user = `/verify/${token}` 
    const url = `http://localhost:3000/api/superheroes`
    const bigUrl = url + user
    const data = await fetch(bigUrl);
    return (await data.json())??[];
  
  }

  async changeStatus(name:string, status:boolean): Promise<any>{
    const user = {status:status};
    const id = `userStatus/${name}`;
    const thisURL = this.url+id;
    try{
      const response = await fetch(thisURL, {
        method: 'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(user),
      });
      return response.json();
    }catch(error){
      throw(error);
    }
  }

  async changeAdminStatus(name:string, adminStatus:boolean): Promise<any>{
    const user = {adminStatus:adminStatus};
    const id = `adminStatus/${name}`;
    const thisURL = this.url+id;
    try{
      const response = await fetch(thisURL, {
        method: 'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(user),
      });
      return response.json();
    }catch(error){
      throw(error);
    }
  }

  async verifyUser():Promise<any>{
    const idName = `user`;
    const thisurl = this.url + idName;

    try{
      const response = await fetch(thisurl, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        },
        credentials: 'include'
      }).then(
        (response: any) =>{
          
          return response.name;
        }
      );
    } catch(error){
      console.log("You are not logged in");
    }
  }

  getUsers(): Promise<any[]> {
    const idName = `getUsers`;
    const thisurl = this.url + idName;
    return fetch(thisurl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching lists:', error);
        throw error;
      });
  }
  getUser(name: string): Promise<User[]> {
    const idName = `getUsers/`;
    const thisurl = this.url + idName + name;
    return fetch(thisurl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching lists:', error);
        throw error;
      });
  }

  getUserByEmail(email: string): Promise<User> {
    const idName = `getUsersByEmail/`;
    const thisurl = this.url + idName + email;
    return fetch(thisurl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching lists:', error);
        throw error;
      });
  }

  async deleteUser(email:string):Promise<any>{
    const idName = `delete/${email}`;
    const thisurl = this.url + idName;

    try{
      const response = await fetch(thisurl, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
        }
      }).then(
        (response: any) =>{
          console.log("deleted");
          return response;
        }
      );
    } catch(error){
      console.log("");
    }
  }

}

  

