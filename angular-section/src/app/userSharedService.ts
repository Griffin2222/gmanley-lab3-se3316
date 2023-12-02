
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserSharedService {
  verificationToken: string = '';
}