import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-updatepassword',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.css'
})
export class UpdatepasswordComponent {
  authenticated = true;

constructor(private userservice: UserService, private router:Router){}  

 async resetPassword(email:string, password:string,username:string, newpassword:string){
    console.log(email);
    console.log(password);
    console.log(newpassword);
    const loginUser = await this.userservice.login(email, password);
    await this.userservice.deleteUser(email);
    await this.userservice.registerUser(email, username, newpassword);
  }

  private url = "http://ec2-3-90-246-226.compute-1.amazonaws.com:3000/api/superheroes/";
  async logout(): Promise<void>{
    const idName = `logout`;
    const thisurl = this.url + idName;
    try{
      const response = await fetch(thisurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      }).then(
        ()=> {
          this.authenticated = false;
          this.router.navigate(['/login']);
        })
    }catch(error){
      console.log("error")
    }
  }

}
