import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'

@Component({
  selector: 'app-create-account-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-account-btn.component.html',
  styleUrl: './create-account-btn.component.css'
})
export class CreateAccountBtnComponent {
  constructor (private router: Router){}

  onClick() {
    this.router.navigate(['/createNewAccount']);
  }
}
