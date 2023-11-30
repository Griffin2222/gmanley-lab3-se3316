import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user.service';


import { Router } from '@angular/router';
import { User } from '../../user';
import { Emitters } from '../../emitters/emitters';

@Component({
  selector: 'login-screen',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @ViewChild('username') usernameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('password') passwordInput!: ElementRef<HTMLInputElement>;
  response: {message: string} = {message: ""};
  invalid: boolean = true;
  userActive: boolean = true;
  message:string;
  

  constructor(private router: Router,
    private userService: UserService){}


  createAccountBtn() {
    this.router.navigate(['/createNewAccount']);
  }
  viewAsGuest(){
    this.router.navigate(['/guest']);
  }
  viewCopyright(){
    this.router.navigate(['/copyright']);
  }

  async login(email: string, password: string){
   try{
    this.response = await this.userService.login(email, password);
    const user = await this.userService.getUserByEmail(email);
    if(user.active == false){
      this.userActive = false;
      this.response.message = 'failure';
      console.log(this.response.message);
    }else if(this.response && this.response.message=== 'success'){
      if(email==='admin@admin.com'||user.admin == true){
        this.router.navigate(['/admin']);
      }else{
      this.router.navigate(['/heros']);
      }
    }else{
      this.invalid = false;
    }
  } catch(error){
    console.log(error)
  }
    // console.log('password', password);
    // console.log('email', email);


  }
  
 
}
