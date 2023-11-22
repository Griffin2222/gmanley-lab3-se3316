import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Router } from '@angular/router';

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
  

  constructor(private router: Router){}


  createAccountBtn() {
    this.router.navigate(['/createNewAccount']);
  }

  login(username: string, password: string){
    this.router.navigate(['/heros'])
    console.log('password', password);
    console.log('username', username);
  }
}
