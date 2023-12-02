import { Component, ViewChild, ElementRef, OnInit, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../user.service';
import { User } from '../../user';
import { VerifyEmailComponent } from '../../verify-email/verify-email.component';
import { UserSharedService } from '../../userSharedService';



@Component({
  selector: 'app-create-account-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-account-page.component.html',
  styleUrl: './create-account-page.component.css'
})
@Injectable({
  providedIn:'root',
})
export class CreateAccountPageComponent {
  @ViewChild('userName') userNameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('pword') pwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('confirmPWord') confirmPWord!: ElementRef<HTMLInputElement>;
  verificationToken:string = "";

  constructor(private userService: UserService,
    private router: Router,
    private userSharedService:UserSharedService){}

  validateEmail = (email:any) =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.match(emailRegex)){
      return true;
    }else{
      return false;
    }
  }

 async createAccount(email: string, name:string, password:string){
    console.log('email', email);
    console.log('name', name);
    console.log('pword', password);
    if(email == ""||name == ""||password==""){
      console.log("Error, please enter all fields");
    }else if(!this.validateEmail(email)){
      console.log("Error, email is not valid")
    }else{
      const user = await this.userService.registerUser(email,name,password);
      this.router.navigate(['/verifyEmail']);

      const user1 = await this.userService.getUserByEmail(email)
      this.userSharedService.verificationToken = user1.verificationToken;
      console.log(user1.verificationToken);
    }
  }
}
