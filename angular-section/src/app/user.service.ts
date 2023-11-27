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

}

  

