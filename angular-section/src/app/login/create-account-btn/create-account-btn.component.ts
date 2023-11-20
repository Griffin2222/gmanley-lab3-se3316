import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-account-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-account-btn.component.html',
  styleUrl: './create-account-btn.component.css'
})
export class CreateAccountBtnComponent {


  onClick() {
    console.log("create acct");
  }
}
