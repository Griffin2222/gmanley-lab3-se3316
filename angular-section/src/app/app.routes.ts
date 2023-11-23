import { Routes } from '@angular/router';
import { HeaderComponent } from './login/Main/header.component';
import { MainComponent } from './heros/main/main.component';
import { CreateAccountPageComponent } from './createNewAccount/create-account-page/create-account-page.component';
import { DetailsComponent } from './heros/details/details.component';

export const routes: Routes = [
    {path : 'login', component : HeaderComponent},
    {path : 'heros', component : MainComponent},
    {path : 'createNewAccount', component : CreateAccountPageComponent},
    {path : '', redirectTo:'/login', pathMatch: 'full'},
    {path : 'details/:id', component: DetailsComponent}

];
