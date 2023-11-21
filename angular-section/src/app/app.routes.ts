import { Routes } from '@angular/router';
import { HeaderComponent } from './login/Main/header.component';
import { MainComponent } from './heros/main/main.component';

export const routes: Routes = [
    {path : 'login', component : HeaderComponent},
    {path : 'heros', component : MainComponent},
    {path : '', redirectTo:'/login', pathMatch: 'full'}

];
