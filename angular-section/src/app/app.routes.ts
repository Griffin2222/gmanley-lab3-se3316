import { Routes } from '@angular/router';
import { HeaderComponent } from './login/Main/header.component';
import { MainComponent } from './heros/main/main.component';
import { CreateAccountPageComponent } from './createNewAccount/create-account-page/create-account-page.component';
import { DetailsComponent } from './heros/details/details.component';
import { AdminComponent } from './Admin/admin.component';
import { GuestComponent } from './guest/GuestMain/guest.component';
import { CopyrightInfoComponent } from './copyright-info/copyright-info.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';

export const routes: Routes = [
    {path : 'login', component : HeaderComponent},
    {path : 'heros', component : MainComponent},
    {path : 'createNewAccount', component : CreateAccountPageComponent},
    {path : '', redirectTo:'/login', pathMatch: 'full'},
    {path : 'details/:id', component: DetailsComponent},
    {path : 'admin', component: AdminComponent},
    {path : 'guest', component: GuestComponent},
    {path: 'copyright', component:CopyrightInfoComponent },
    {path : 'resetPword', component: UpdatepasswordComponent}

];
