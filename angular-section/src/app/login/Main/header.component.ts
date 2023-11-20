import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginbtnComponent } from '../loginbtn/loginbtn.component';
import { CreateAccountBtnComponent } from '../create-account-btn/create-account-btn.component';
import { UsernameComponent } from '../username/username.component';
import { PasswordComponent } from '../password/password.component';

@Component({
  selector: 'login-screen',
  standalone: true,
  imports: [CommonModule,LoginbtnComponent, CreateAccountBtnComponent, UsernameComponent, PasswordComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title: string = 'Login Component'
}
