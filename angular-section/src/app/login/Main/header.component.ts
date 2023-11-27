import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user.service';


import { Router } from '@angular/router';
import { User } from '../../user';

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
  

  constructor(private router: Router,
    private userService: UserService){}


  createAccountBtn() {
    this.router.navigate(['/createNewAccount']);
  }

  async login(email: string, password: string){
   try{
    this.response = await this.userService.login(email, password);
    if(this.response && this.response.message=== 'success'){
      this.router.navigate(['/heros']);
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
