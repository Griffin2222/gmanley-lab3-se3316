import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CreateAccountPageComponent } from '../createNewAccount/create-account-page/create-account-page.component';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserSharedService } from '../userSharedService';


@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, CreateAccountPageComponent],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class VerifyEmailComponent {
  errors: string = "";

  constructor(
    private router: Router,
    private userService: UserService,
    private userSharedService: UserSharedService
  ) {}

  async confirmEmail() {
    try {
      const token = await this.userService.verifyEmail(this.userSharedService.verificationToken);
      if (token.message === "Email verified successfully. You can now login.") {
        this.router.navigate(['/login']);
      } else {
        this.errors = "Error verifying email!";
      }
    } catch (error) {
      console.error(error);
      this.errors = "Error verifying email!";
    }
  }
}
