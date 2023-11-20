import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loginbtn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loginbtn.component.html',
  styleUrl: './loginbtn.component.css'
})
export class LoginbtnComponent{



  onClick() {
    console.log('login');
  }
}
