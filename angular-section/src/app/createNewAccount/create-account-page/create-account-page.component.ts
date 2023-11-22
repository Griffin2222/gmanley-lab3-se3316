import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-account-page.component.html',
  styleUrl: './create-account-page.component.css'
})
export class CreateAccountPageComponent {
  @ViewChild('userName') userNameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('pword') pwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('confirmPWord') confirmPWord!: ElementRef<HTMLInputElement>;

  constructor(private router: Router){}

  createAccount(userName: string, pword:string, confirmPWord:string){
    console.log('user', userName);
    console.log('pword', pword);
    console.log('cpword', confirmPWord);
    this.router.navigate(['/login']);
  }
}
