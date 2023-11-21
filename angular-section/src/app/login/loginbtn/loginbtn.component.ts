import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginbtn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loginbtn.component.html',
  styleUrl: './loginbtn.component.css'
})
export class LoginbtnComponent{

  constructor(private router: Router){}

  onClick() {
    this.router.navigate(['/heros']);
  }
}
